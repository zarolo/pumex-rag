-- ============================================
-- Learned Knowledge Support
-- Run this in Supabase SQL Editor
-- ============================================

-- Add 'learned' to the folder and truth_status enums
-- Note: This requires dropping and recreating the constraint
-- If you get errors, you may need to temporarily disable RLS

-- First, update existing constraint to allow 'learned'
ALTER TABLE documents 
  DROP CONSTRAINT IF EXISTS documents_folder_check;

ALTER TABLE documents
  ADD CONSTRAINT documents_folder_check 
  CHECK (folder IN ('canonical', 'current', 'drafts', 'archive', 'context', 'learned'));

ALTER TABLE documents 
  DROP CONSTRAINT IF EXISTS documents_truth_status_check;

ALTER TABLE documents
  ADD CONSTRAINT documents_truth_status_check 
  CHECK (truth_status IN ('canonical', 'current', 'drafts', 'archive', 'context', 'learned'));

-- Create learned_knowledge table for tracking
CREATE TABLE IF NOT EXISTS learned_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source_conversation TEXT,
  source_question TEXT,
  created_by TEXT DEFAULT 'chatgpt',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS learned_knowledge_created_at_idx ON learned_knowledge(created_at DESC);

