require("dotenv").config();
const { Pool } = require("pg");

// Shared connection pool for database queries
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

module.exports = pool;
