-- ============================================
-- PUMEX RAG: Supabase pgvector Setup
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================

-- 1. Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI text-embedding-3-small dimension
  filename TEXT NOT NULL,
  folder TEXT NOT NULL CHECK (folder IN ('canonical', 'current', 'drafts', 'archive', 'context')),
  truth_status TEXT NOT NULL CHECK (truth_status IN ('canonical', 'current', 'drafts', 'archive', 'context')),
  chunk_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create index for fast vector similarity search
CREATE INDEX IF NOT EXISTS documents_embedding_idx 
ON documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 4. Create index for filtering by folder/truth_status
CREATE INDEX IF NOT EXISTS documents_folder_idx ON documents(folder);
CREATE INDEX IF NOT EXISTS documents_truth_status_idx ON documents(truth_status);
CREATE INDEX IF NOT EXISTS documents_filename_idx ON documents(filename);

-- 5. Create a function for similarity search with truth_status weighting
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_count INT DEFAULT 10,
  include_drafts BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  filename TEXT,
  folder TEXT,
  truth_status TEXT,
  similarity FLOAT,
  weighted_score FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.content,
    d.filename,
    d.folder,
    d.truth_status,
    1 - (d.embedding <=> query_embedding) AS similarity,
    -- Weighted score: similarity * truth_weight
    (1 - (d.embedding <=> query_embedding)) * 
    CASE d.truth_status
      WHEN 'canonical' THEN 1.0
      WHEN 'current' THEN 0.9
      WHEN 'context' THEN 0.8
      WHEN 'archive' THEN 0.5
      WHEN 'drafts' THEN 0.3
    END AS weighted_score
  FROM documents d
  WHERE 
    -- Exclude drafts unless explicitly requested
    (include_drafts = TRUE OR d.truth_status != 'drafts')
  ORDER BY weighted_score DESC
  LIMIT match_count;
END;
$$;

-- 6. Create a function to upsert documents (for re-ingestion)
CREATE OR REPLACE FUNCTION upsert_document(
  p_content TEXT,
  p_embedding vector(1536),
  p_filename TEXT,
  p_folder TEXT,
  p_truth_status TEXT,
  p_chunk_index INTEGER
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_id UUID;
BEGIN
  -- Check if this chunk already exists
  SELECT id INTO v_id
  FROM documents
  WHERE filename = p_filename AND chunk_index = p_chunk_index;
  
  IF v_id IS NOT NULL THEN
    -- Update existing
    UPDATE documents
    SET 
      content = p_content,
      embedding = p_embedding,
      folder = p_folder,
      truth_status = p_truth_status,
      updated_at = NOW()
    WHERE id = v_id;
  ELSE
    -- Insert new
    INSERT INTO documents (content, embedding, filename, folder, truth_status, chunk_index)
    VALUES (p_content, p_embedding, p_filename, p_folder, p_truth_status, p_chunk_index)
    RETURNING id INTO v_id;
  END IF;
  
  RETURN v_id;
END;
$$;

-- 7. Helper: Delete all chunks for a file (useful for re-ingestion)
CREATE OR REPLACE FUNCTION delete_document_chunks(p_filename TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM documents WHERE filename = p_filename;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

