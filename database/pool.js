require("dotenv").config();
const { Pool } = require("pg");

// Shared connection pool for database queries
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
