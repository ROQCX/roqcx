-- Create chunks table with session support
CREATE TABLE IF NOT EXISTS chunks (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  session_id TEXT,
  is_global BOOLEAN DEFAULT FALSE,
  created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
  updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
);

-- Create embeddings table with session support
CREATE TABLE IF NOT EXISTS embeddings (
  id TEXT PRIMARY KEY,
  chunk_id TEXT NOT NULL,
  session_id TEXT,
  embedding VECTOR NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
  updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
  FOREIGN KEY (chunk_id) REFERENCES chunks(id) ON DELETE CASCADE
);

-- Create index on session_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_chunks_session ON chunks(session_id);
CREATE INDEX IF NOT EXISTS idx_embeddings_session ON embeddings(session_id);

-- Create index on updated_at for cleanup
CREATE INDEX IF NOT EXISTS idx_chunks_updated ON chunks(updated_at);
CREATE INDEX IF NOT EXISTS idx_embeddings_updated ON embeddings(updated_at);

-- Create vector index for similarity search
CREATE VECTOR INDEX IF NOT EXISTS embeddings_idx ON embeddings(embedding); 