/**
 * PUMEX RAG: Query Script
 * 
 * Takes a user question, embeds it, performs similarity search
 * with truth_status weighting.
 * 
 * Schema: documents (metadata) + chunks (content + embeddings)
 * 
 * Usage: 
 *   npm run query "What is vePUMX?"
 *   npm run query "What is the initiation campaign?" --include-drafts
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import 'dotenv/config';

// ============================================
// Configuration
// ============================================

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ============================================
// Validation
// ============================================

if (!SUPABASE_URL || !SUPABASE_KEY || !OPENAI_API_KEY) {
  console.error('❌ Missing environment variables.');
  console.error('Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY');
  process.exit(1);
}

// ============================================
// Initialize clients
// ============================================

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ============================================
// Query Function
// ============================================

/**
 * Main query function - can be imported and used elsewhere.
 * 
 * @param {string} question - The user's question
 * @param {Object} options - Query options
 * @param {number} options.limit - Max results (default: 5)
 * @param {boolean} options.includeDrafts - Include drafts folder (default: false)
 * @returns {Promise<Array>} - Array of matching document chunks with scores
 */
export async function queryRAG(question, options = {}) {
  const { limit = 5, includeDrafts = false } = options;
  
  // 1. Generate embedding for the question
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: question
  });
  
  const queryEmbedding = embeddingResponse.data[0].embedding;
  
  // 2. Call the Supabase function for weighted similarity search
  const { data, error } = await supabase.rpc('match_chunks', {
    query_embedding: queryEmbedding,
    match_count: limit,
    include_drafts: includeDrafts
  });
  
  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }
  
  return data;
}

/**
 * Format results for display
 */
function formatResults(results) {
  if (!results || results.length === 0) {
    return 'No matching documents found.';
  }
  
  let output = '';
  
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const similarity = (r.similarity * 100).toFixed(1);
    const weighted = (r.weighted_score * 100).toFixed(1);
    
    output += `\n${'─'.repeat(60)}\n`;
    output += `📄 [${i + 1}] ${r.title}\n`;
    output += `   Path: ${r.path} | Status: ${r.status}\n`;
    output += `   Similarity: ${similarity}% | Weighted: ${weighted}%\n`;
    output += `${'─'.repeat(60)}\n`;
    output += `${r.content.substring(0, 500)}${r.content.length > 500 ? '...' : ''}\n`;
  }
  
  return output;
}

// ============================================
// CLI Interface
// ============================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log(`
PUMEX RAG Query Tool
────────────────────

Usage:
  npm run query "your question here"
  npm run query "your question" --include-drafts
  npm run query "your question" --limit 10

Options:
  --include-drafts    Include documents from drafts/ folder
  --limit <n>         Max number of results (default: 5)
  --json              Output raw JSON instead of formatted text

Examples:
  npm run query "What is vePUMX?"
  npm run query "How do epochs work?" --limit 3
  npm run query "What is the initiation campaign?" --include-drafts
`);
    process.exit(0);
  }
  
  // Parse arguments
  const question = args.find(a => !a.startsWith('--'));
  const includeDrafts = args.includes('--include-drafts');
  const jsonOutput = args.includes('--json');
  
  let limit = 5;
  const limitIndex = args.indexOf('--limit');
  if (limitIndex !== -1 && args[limitIndex + 1]) {
    limit = parseInt(args[limitIndex + 1], 10);
  }
  
  if (!question) {
    console.error('❌ Please provide a question.');
    console.error('Usage: npm run query "your question"');
    process.exit(1);
  }
  
  console.log(`\n🔍 Searching for: "${question}"`);
  if (includeDrafts) console.log('   (including drafts)');
  console.log('');
  
  try {
    const results = await queryRAG(question, { limit, includeDrafts });
    
    if (jsonOutput) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(formatResults(results));
    }
    
  } catch (err) {
    console.error('❌ Query failed:', err.message);
    process.exit(1);
  }
}

main();
