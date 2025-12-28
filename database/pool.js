require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

// Shared connection pool for database queries
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

console.log("DB Pool created, production mode:", isProduction);

module.exports = pool;
