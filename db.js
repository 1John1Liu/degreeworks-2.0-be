require('dotenv').config();
const { Pool } = require('pg');

// Configuration for PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Export the pool to be used globally
module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
