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
import { queryRAG } from './scripts/query.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Validate environment variables on startup (but don't crash)
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'OPENAI_API_KEY'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.warn('⚠️  Warning: Missing environment variables:', missingVars.join(', '));
  console.warn('   API endpoints will fail until these are set.');
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'pumex-rag-api' });
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

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PUMEX RAG API running on port ${PORT}`);
  console.log(`   Health: /health`);
  console.log(`   Query:  POST /api/query`);
  console.log(`   OpenAPI: /openapi.yaml`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
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

