-- ============================================
-- Query Logging Table for Analytics
-- Run this in Supabase SQL Editor
-- ============================================

-- Create query_logs table
CREATE TABLE IF NOT EXISTS query_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  question_embedding vector(1536),
  results_count INTEGER DEFAULT 0,
  top_similarity FLOAT,
  top_weighted_score FLOAT,
  include_drafts BOOLEAN DEFAULT FALSE,
  response_time_ms INTEGER,
  user_ip TEXT,
  api_key_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS query_logs_created_at_idx ON query_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS query_logs_question_idx ON query_logs USING gin(to_tsvector('english', question));

-- View: Popular questions (last 30 days)
CREATE OR REPLACE VIEW popular_questions AS
SELECT 
  question,
  COUNT(*) as query_count,
  AVG(top_similarity) as avg_similarity,
  AVG(response_time_ms) as avg_response_time,
  MAX(created_at) as last_asked
FROM query_logs
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY question
ORDER BY query_count DESC
LIMIT 100;

-- View: Query statistics
CREATE OR REPLACE VIEW query_stats AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_queries,
  AVG(response_time_ms) as avg_response_time,
  AVG(top_similarity) as avg_similarity,
  COUNT(DISTINCT question) as unique_questions
FROM query_logs
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

