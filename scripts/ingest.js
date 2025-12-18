/**
 * PUMEX RAG: Document Ingestion Script
 * 
 * Reads markdown files from pumex-knowledge folders,
 * chunks them intelligently, generates embeddings,
 * and upserts them into Supabase.
 * 
 * Schema: documents (metadata) + chunks (content + embeddings)
 * 
 * Usage: npm run ingest
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { glob } from 'glob';
import { readFileSync } from 'fs';
import { basename } from 'path';
import { createHash } from 'crypto';
import 'dotenv/config';

// ============================================
// Configuration
// ============================================

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Chunk settings
const MAX_CHUNK_SIZE = 1500; // characters (roughly 375 tokens)
const CHUNK_OVERLAP = 200;  // characters of overlap between chunks

// ============================================
// Validation
// ============================================

if (!SUPABASE_URL || !SUPABASE_KEY || !OPENAI_API_KEY) {
  console.error('❌ Missing environment variables.');
  console.error('Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY');
  console.error('Create a .env file in the project root with these values.');
  process.exit(1);
}

// ============================================
// Initialize clients
// ============================================

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ============================================
// Helpers
// ============================================

/**
 * Extract title from markdown content (first # heading or filename)
 */
function extractTitle(content, filename) {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim();
  }
  // Remove [PREFIX] and .md from filename
  return filename.replace(/^\[.*?\]\s*/, '').replace(/\.md$/, '');
}

/**
 * Generate hash of content for change detection
 */
function hashContent(content) {
  return createHash('md5').update(content).digest('hex');
}

/**
 * Map folder name to status
 */
function folderToStatus(folder) {
  const map = {
    canonical: 'canonical',
    current: 'current',
    drafts: 'drafts',
    archive: 'archive',
    context: 'context'
  };
  return map[folder] || 'drafts';
}

// ============================================
// Chunking Logic
// ============================================

/**
 * Intelligently chunks a markdown document.
 * Splits on headers, then paragraphs, maintaining context.
 */
export function chunkDocument(content, filename) {
  const chunks = [];
  
  // Clean content: normalize line endings, trim
  const cleanContent = content.replace(/\r\n/g, '\n').trim();
  
  // Split by markdown headers (## or ###)
  const sections = cleanContent.split(/(?=^#{2,3}\s)/m);
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    // If section is small enough, use as-is
    if (section.length <= MAX_CHUNK_SIZE) {
      chunks.push(section.trim());
      continue;
    }
    
    // Otherwise, split by paragraphs (double newline)
    const paragraphs = section.split(/\n\n+/);
    let currentChunk = '';
    
    for (const para of paragraphs) {
      const trimmedPara = para.trim();
      if (!trimmedPara) continue;
      
      // If adding this paragraph exceeds limit, save current and start new
      if (currentChunk.length + trimmedPara.length > MAX_CHUNK_SIZE && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        // Start new chunk with overlap from previous
        const overlapText = currentChunk.slice(-CHUNK_OVERLAP);
        currentChunk = overlapText + '\n\n' + trimmedPara;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + trimmedPara;
      }
    }
    
    // Don't forget the last chunk
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
  }
  
  // If no chunks created (file too small or weird format), use whole content
  if (chunks.length === 0 && cleanContent.length > 0) {
    chunks.push(cleanContent);
  }
  
  console.log(`  📄 ${filename}: ${chunks.length} chunk(s)`);
  return chunks;
}

// ============================================
// Embedding Generation
// ============================================

/**
 * Generates embeddings for an array of text chunks.
 * Uses OpenAI's text-embedding-3-small model.
 */
export async function generateEmbeddings(chunks, apiKey = null) {
  const embeddings = [];
  
  // Use provided API key or fall back to env var
  const { default: OpenAI } = await import('openai');
  const openaiClient = apiKey 
    ? new OpenAI({ apiKey })
    : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  // Process in batches of 20 to avoid rate limits
  const batchSize = 20;
  
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    
    const response = await openaiClient.embeddings.create({
      model: 'text-embedding-3-small',
      input: batch
    });
    
    for (const item of response.data) {
      embeddings.push(item.embedding);
    }
    
    // Small delay between batches
    if (i + batchSize < chunks.length) {
      await new Promise(r => setTimeout(r, 100));
    }
  }
  
  return embeddings;
}

// ============================================
// Supabase Operations
// ============================================

/**
 * Upsert document and its chunks into Supabase.
 */
async function upsertDocument(filePath, folder, content, chunks, embeddings) {
  const filename = basename(filePath);
  const title = extractTitle(content, filename);
  const status = folderToStatus(folder);
  const hash = hashContent(content);
  const now = new Date().toISOString();
  
  // Check if document exists
  const { data: existing } = await supabase
    .from('documents')
    .select('id, hash')
    .eq('path', filePath)
    .single();
  
  let documentId;
  
  if (existing) {
    // Skip if content unchanged
    if (existing.hash === hash) {
      console.log(`  ⏭️  ${filename} (unchanged)`);
      return { skipped: true };
    }
    
    // Update existing document
    documentId = existing.id;
    
    const { error: updateError } = await supabase
      .from('documents')
      .update({ title, status, hash, last_updated: now })
      .eq('id', documentId);
    
    if (updateError) {
      throw new Error(`Update failed: ${updateError.message}`);
    }
    
    // Delete old chunks
    await supabase.from('chunks').delete().eq('document_id', documentId);
    
  } else {
    // Insert new document
    const { data: newDoc, error: insertError } = await supabase
      .from('documents')
      .insert({ path: filePath, title, status, hash, last_updated: now })
      .select('id')
      .single();
    
    if (insertError) {
      throw new Error(`Insert failed: ${insertError.message}`);
    }
    
    documentId = newDoc.id;
  }
  
  // Insert chunks
  const chunkRecords = chunks.map((content, index) => ({
    document_id: documentId,
    chunk_index: index,
    content,
    embedding: embeddings[index]
  }));
  
  const { error: chunkError } = await supabase
    .from('chunks')
    .insert(chunkRecords);
  
  if (chunkError) {
    throw new Error(`Chunk insert failed: ${chunkError.message}`);
  }
  
  return { skipped: false, chunkCount: chunks.length };
}

// ============================================
// Main Ingestion
// ============================================

async function main() {
  console.log('🚀 PUMEX RAG Ingestion Starting...\n');
  
  // Find all markdown files in knowledge folders
  const folders = ['canonical', 'current', 'drafts', 'archive', 'context'];
  let totalFiles = 0;
  let totalChunks = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const folder of folders) {
    console.log(`\n📁 Processing ${folder}/`);
    
    const pattern = `./${folder}/**/*.md`;
    const files = await glob(pattern);
    
    if (files.length === 0) {
      console.log(`  (no files found)`);
      continue;
    }
    
    for (const filePath of files) {
      try {
        const content = readFileSync(filePath, 'utf-8');
        const filename = basename(filePath);
        
        // Chunk the document
        const chunks = chunkDocument(content, filename);
        
        // Generate embeddings
        const embeddings = await generateEmbeddings(chunks, OPENAI_API_KEY);
        
        // Upsert to Supabase
        const result = await upsertDocument(filePath, folder, content, chunks, embeddings);
        
        if (result.skipped) {
          skipped++;
        } else {
          totalFiles++;
          totalChunks += result.chunkCount;
        }
        
        // Rate limiting
        await new Promise(r => setTimeout(r, 200));
        
      } catch (err) {
        console.error(`  ❌ Error processing ${filePath}:`, err.message);
        errors++;
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Ingestion Complete');
  console.log(`   Files processed: ${totalFiles}`);
  console.log(`   Files skipped (unchanged): ${skipped}`);
  console.log(`   Total chunks: ${totalChunks}`);
  if (errors > 0) {
    console.log(`   Errors: ${errors}`);
  }
  console.log('='.repeat(50));
}

main().catch(console.error);
