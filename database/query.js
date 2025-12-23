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

async function updateCategory(category, id) {}

async function getCategoryById(id) {
  await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
}

async function postProduct(product) {
  await pool.query("INSERT INTO products (product) VALUES ($1)", [product]);
}

async function getProductById(id) {
  await pool.query("SELECT * FROM products WHERE id = $1", [id]);
}

async function updateProduct(name, price, brand_id, category_id, id) {
  await pool.query(
    "UPDATE products SET name  = $1, price = $2, brand_id = $3, category_id = $4 WHERE id = $5",
    [name, price, brand_id, category_id, id]
  );
}

async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  getProductsByCategory,
  postCategory,
  postProduct,
  getCategoryById,
  getProductById,
  updateProduct,
  deleteProduct,
};
