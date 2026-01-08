import pkg from "pg";
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL missing. DB features disabled.");
}

export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("railway")
        ? { rejectUnauthorized: false }
        : false
    })
  : null;

export async function initDb() {
  if (!pool) return;

  // Create table if it doesn't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      sender TEXT,
      message TEXT NOT NULL,
      classification TEXT,
      reply TEXT
    );
  `);
}

export async function insertMessage({ sender, message, classification, reply }) {
  if (!pool) return null;

  const result = await pool.query(
    `INSERT INTO messages (sender, message, classification, reply)
     VALUES ($1, $2, $3, $4)
     RETURNING id, created_at`,
    [sender || null, message, classification || null, reply || null]
  );

  return result.rows[0];
}

export async function getRecentMessages(limit = 20) {
  if (!pool) return [];

  const result = await pool.query(
    `SELECT id, created_at, sender, message, classification, reply
     FROM messages
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  );

  return result.rows;
}
