-- ============================================
-- Update match_chunks function to include 'learned' status
-- Run this in Supabase SQL Editor
-- ============================================

CREATE OR REPLACE FUNCTION match_chunks(
  query_embedding vector(1536),
  match_count INT DEFAULT 10,
  include_drafts BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
  chunk_id UUID,
  document_id UUID,
  content TEXT,
  path TEXT,
  title TEXT,
  status TEXT,
  similarity FLOAT,
  weighted_score FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id AS chunk_id,
    d.id AS document_id,
    c.content,
    d.path,
    d.title,
    d.status,
    1 - (c.embedding <=> query_embedding) AS similarity,
    (1 - (c.embedding <=> query_embedding)) * 
    CASE d.status
      WHEN 'canonical' THEN 1.0
      WHEN 'current' THEN 0.9
      WHEN 'context' THEN 0.8
      WHEN 'learned' THEN 0.7  -- Learned knowledge (from conversations)
      WHEN 'archive' THEN 0.5
      WHEN 'drafts' THEN 0.3
    END AS weighted_score
  FROM chunks c
  JOIN documents d ON c.document_id = d.id
  WHERE (include_drafts = TRUE OR d.status != 'drafts')
  ORDER BY weighted_score DESC
  LIMIT match_count;
END;
$$;

