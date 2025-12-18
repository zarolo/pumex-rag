/**
 * PUMEX RAG API Server
 * 
 * Exposes RAG query endpoint for ChatGPT Custom GPT Actions
 * 
 * Usage:
 *   npm start          # Run locally (port 3000)
 *   PORT=8080 npm start # Custom port
 */

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { queryRAG, getLastQueryEmbedding } from './scripts/query.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Key authentication middleware (optional - only if API_KEY is set)
const API_KEY = process.env.API_KEY;
if (API_KEY) {
  app.use('/api', (req, res, next) => {
    const providedKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    if (providedKey === API_KEY) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized - Invalid API key' });
    }
  });
}

// Validate environment variables on startup (but don't crash)
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'OPENAI_API_KEY'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.warn('⚠️  Warning: Missing environment variables:', missingVars.join(', '));
  console.warn('   API endpoints will fail until these are set.');
}

// Health check - MUST be first and respond immediately
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'pumex-rag-api' });
});

// Root endpoint (for Railway health checks)
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'pumex-rag-api',
    endpoints: {
      health: '/health',
      query: 'POST /api/query',
      openapi: '/openapi.yaml'
    }
  });
});

// Serve OpenAPI schema for ChatGPT
app.get('/openapi.yaml', (req, res) => {
  try {
    const schema = readFileSync(join(__dirname, 'openapi.yaml'), 'utf-8');
    res.setHeader('Content-Type', 'text/yaml');
    res.send(schema);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load OpenAPI schema' });
  }
});

// Query endpoint for ChatGPT Custom GPT
app.post('/api/query', async (req, res) => {
  const startTime = Date.now();
  let questionEmbedding = null;
  
  try {
    const { question, limit = 5, include_drafts = false } = req.body;
    
    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid "question" parameter'
      });
    }
    
    const results = await queryRAG(question, {
      limit: parseInt(limit, 10) || 5,
      includeDrafts: include_drafts === true || include_drafts === 'true'
    });
    
    // Format results for ChatGPT
    const formatted = results.map(r => ({
      title: r.title,
      path: r.path,
      status: r.status,
      content: r.content,
      similarity: Math.round(r.similarity * 100) / 100,
      weighted_score: Math.round(r.weighted_score * 100) / 100
    }));
    
    const responseTime = Date.now() - startTime;
    const topResult = results[0];
    questionEmbedding = getLastQueryEmbedding();
    
    // Log query (async, don't block response)
    logQuery(question, questionEmbedding, {
      resultsCount: formatted.length,
      topSimilarity: topResult?.similarity,
      topWeightedScore: topResult?.weighted_score,
      includeDrafts: include_drafts === true || include_drafts === 'true',
      responseTime,
      userIp: req.ip || req.headers['x-forwarded-for'],
      apiKeyId: req.headers['x-api-key'] ? 'provided' : null
    }).catch(err => console.error('Failed to log query:', err));
    
    res.json({
      question,
      results: formatted,
      count: formatted.length
    });
    
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({
      error: 'Query failed',
      message: error.message
    });
  }
});

// Learn endpoint - Save knowledge from ChatGPT conversations
app.post('/api/learn', async (req, res) => {
  try {
    const { title, content, source_question, source_conversation } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        error: 'Missing required fields: title and content'
      });
    }
    
    // Save to learned_knowledge table
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Insert into learned_knowledge
    const { data: learned, error: learnedError } = await supabase
      .from('learned_knowledge')
      .insert({
        title,
        content,
        source_question,
        source_conversation,
        created_by: 'chatgpt'
      })
      .select('id')
      .single();
    
    if (learnedError) {
      throw new Error(`Failed to save learned knowledge: ${learnedError.message}`);
    }
    
    // Process and embed the content (chunk it, generate embeddings, save to documents)
    const { chunkDocument, generateEmbeddings } = await import('./scripts/ingest.js');
    
    // Chunk the content
    const chunks = chunkDocument(content, `${title}.md`);
    
    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks, process.env.OPENAI_API_KEY);
    
    // Save to documents table with 'learned' status
    const filename = `[LEARNED] ${title}.md`;
    const documentRecords = chunks.map((chunkContent, index) => ({
      content: chunkContent,
      embedding: embeddings[index],
      filename,
      folder: 'learned',
      truth_status: 'learned',
      chunk_index: index
    }));
    
    const { error: docError } = await supabase
      .from('documents')
      .insert(documentRecords);
    
    if (docError) {
      console.error('Failed to save to documents:', docError);
      // Still return success for learned_knowledge
    }
    
    res.json({
      success: true,
      learned_id: learned.id,
      chunks_saved: chunks.length,
      message: 'Knowledge saved successfully'
    });
    
  } catch (error) {
    console.error('Learn error:', error);
    res.status(500).json({
      error: 'Failed to save knowledge',
      message: error.message
    });
  }
});

// Query logging function (non-blocking)
async function logQuery(question, embedding, metadata) {
  if (process.env.DISABLE_QUERY_LOGGING === 'true') {
    return; // Allow disabling for testing
  }
  
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    await supabase.from('query_logs').insert({
      question,
      question_embedding: embedding,
      results_count: metadata.resultsCount,
      top_similarity: metadata.topSimilarity,
      top_weighted_score: metadata.topWeightedScore,
      include_drafts: metadata.includeDrafts,
      response_time_ms: metadata.responseTime,
      user_ip: metadata.userIp,
      api_key_id: metadata.apiKeyId
    });
  } catch (err) {
    // Fail silently - logging shouldn't break the API
    console.error('Query logging error:', err.message);
  }
}

// Start server
console.log(`📋 Starting server...`);
console.log(`   PORT env var: ${process.env.PORT || 'not set (using default 3000)'}`);
console.log(`   Will listen on: ${PORT}`);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PUMEX RAG API running on port ${PORT}`);
  console.log(`   Health: /health`);
  console.log(`   Query:  POST /api/query`);
  console.log(`   OpenAPI: /openapi.yaml`);
  console.log(`   Server is ready and listening on 0.0.0.0:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  console.error('   Attempted port:', PORT);
  process.exit(1);
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

