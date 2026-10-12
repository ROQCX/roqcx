/** Target schema. Existing databases still need the column alters in migrate.ts. */
export const tableStatements = [
  `CREATE TABLE IF NOT EXISTS chunks (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    session_id TEXT,
    is_global BOOLEAN DEFAULT FALSE,
    created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
  )`,
  `CREATE TABLE IF NOT EXISTS embeddings (
    id TEXT PRIMARY KEY,
    chunk_id TEXT NOT NULL,
    session_id TEXT,
    embedding F32_BLOB(1536) NOT NULL,
    metadata JSON,
    created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    FOREIGN KEY (chunk_id) REFERENCES chunks(id)
  )`,
  `CREATE TABLE IF NOT EXISTS request_limits (
    bucket TEXT PRIMARY KEY,
    hits INTEGER NOT NULL,
    window_start INTEGER NOT NULL
  )`,
]

/** Run after column alters. An index on a column that does not exist yet will fail. */
export const indexStatements = [
  `CREATE INDEX IF NOT EXISTS embeddings_idx ON embeddings (libsql_vector_idx(embedding))`,
  `CREATE INDEX IF NOT EXISTS idx_chunks_session_id ON chunks(session_id)`,
  `CREATE INDEX IF NOT EXISTS idx_chunks_updated_at ON chunks(updated_at)`,
]
