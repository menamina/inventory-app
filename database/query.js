const pool = require("./pool");

// CRUD

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  const result = await pool.query("SELECT current_database()");
  console.log("DB:", result.rows[0], rows[0]);
  return rows;
}

async function getProductsByCategory(catID) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category_id = $1",
    [catID]
  );
  return rows;
}

async function updateCategory(category, id) {
  await pool.query("UPDATE categories SET category = $1 WHERE id = $2", [
    category,
    id,
  ]);
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function postCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}
async function postProduct(name, price, brand_id, category_id) {
  await pool.query(
    "INSERT INTO products (name, price, brand_id, category_id) VALUES ($1, $2, $3, $4)",
    [name, price, brand_id, category_id]
  );
}

async function getProductById(id) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);
  return rows[0];
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
  updateCategory,
  deleteProduct,
  deleteCategory,
};
