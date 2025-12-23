const pool = require("./pool");

// CRUD

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getProductsByCategory(catID) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category_id = $1",
    [catID]
  );
  return rows;
}

async function postCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function postProduct(product) {
  await pool.query("INSERT INTO products (product) VALUES ($1)", [product]);
}

module.exports = {
  getAllCategories,
  getProductsByCategory,
  postCategory,
  postProduct,
};
