const express = require('express');
const { Pool } = require('pg');
const app = express();

const PORT = 5000;

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'testdb',
  port: process.env.DB_PORT || 5432,
});

// Retry logic for DB connection
async function connectWithRetry() {
  let retries = 5;
  while (retries) {
    try {
      await pool.query('SELECT NOW()');
      console.log('✅ Connected to Postgres successfully!');
      return;
    } catch (err) {
      console.log('❌ Failed to connect to Postgres, retrying in 5 seconds...', err.message);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  process.exit(1);
}

connectWithRetry();

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Hello from Express + Postgres! Server time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Error connecting to database');
  }
});

app.listen(PORT, () => console.log(`Backend listening at http://localhost:${PORT}`));
