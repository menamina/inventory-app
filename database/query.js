const pool = require("./pool");

// CRUD

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategory() {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category_id = $1",
    []
  );
  return rows;
}

module.exports = {
  getAllCategories,
};
