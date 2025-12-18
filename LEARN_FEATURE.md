# Learn from Conversation Feature

## Overview

This feature allows ChatGPT to save new knowledge learned from conversations directly into your RAG knowledge base. When ChatGPT learns something new or discovers information not in the knowledge base, it can call the `saveLearnedKnowledge` action to permanently store it.

## Setup

### 1. Run SQL Setup

Execute `scripts/add-learned-knowledge.sql` in Supabase SQL Editor to:
- Add 'learned' to folder/status enums
- Create `learned_knowledge` tracking table

### 2. Update ChatGPT Custom GPT

After Railway redeploys, the new `saveLearnedKnowledge` action will be available in ChatGPT.

**In ChatGPT Custom GPT configuration:**
1. The action should auto-appear after re-importing the OpenAPI schema
2. Or manually add it from the updated schema

## How It Works

1. **ChatGPT learns something new** from a conversation
2. **ChatGPT calls `saveLearnedKnowledge`** with:
   - `title`: Short title for the knowledge
   - `content`: The actual knowledge (markdown supported)
   - `source_question`: Original question that led to this
   - `source_conversation`: Context from the conversation

3. **System processes it:**
   - Saves to `learned_knowledge` table (for tracking)
   - Chunks the content intelligently
   - Generates embeddings
   - Saves to `documents` table with status 'learned'
   - Makes it searchable immediately

4. **Future queries** will include learned knowledge in results

## Usage in ChatGPT

ChatGPT can automatically use this when:
- It discovers new information not in the knowledge base
- User provides corrections or updates
- New protocol features are discussed
- Important clarifications are made

**Example ChatGPT instruction:**
```
When you learn new information that's not in the knowledge base, 
or when users provide corrections, use the saveLearnedKnowledge 
action to save it permanently. This helps the knowledge base 
grow and improve over time.
```

## Truth Status

Learned knowledge gets `truth_status: 'learned'` which has a lower weight than canonical/current but higher than drafts. You can adjust the weighting in the SQL function if needed.

## Viewing Learned Knowledge

Query the `learned_knowledge` table to see:
- What was learned
- When it was learned
- What question led to it
- Source conversation context

## Best Practices

1. **Review periodically** - Check learned_knowledge table for quality
2. **Promote to canonical** - Move important learned items to canonical docs
3. **Clean up** - Remove incorrect or outdated learned knowledge
4. **Monitor** - Track what's being learned to identify knowledge gaps

## Example API Call

```bash
curl -X POST https://pumex-rag-production.up.railway.app/api/learn \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "title": "New Tokenomics Update",
    "content": "# Tokenomics Update\n\nAs of Q1 2025, the emission schedule has been adjusted...",
    "source_question": "What are the current tokenomics?",
    "source_conversation": "User asked about tokenomics, discovered new update not in docs"
  }'
```

