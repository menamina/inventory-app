const pool = require("./pool");

// CRUD

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getProductsByCategory(catID) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE categories_id = $1",
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

async function postProduct(name, price, brandName, categoryName) {
  let brandID;
  let catID;

  const brandObj = await pool.query(
    "SELECT id FROM brands WHERE brand = ($1)",
    [brandName]
  );
  if (brandObj.rows.length === 0) {
    const createBrand = await pool.query(
      "INSERT INTO brands (brand) VALUES ($1) RETURNING id",
      [brandName]
    );
    brandID = createBrand.rows[0].id;
  } else {
    brandID = brandObj.rows[0].id;
  }

  const catObj = await pool.query(
    "SELECT id FROM categories WHERE category = ($1)",
    [categoryName]
  );
  if (catObj.rows.length === 0) {
    const createCat = await pool.query(
      "INSERT INTO categories (category) VALUES ($1) RETURNING id",
      [categoryName]
    );
    catID = createCat.rows[0].id;
  } else {
    catID = catObj.rows[0].id;
  }

  try {
    await pool.query(
      "INSERT INTO products (name, price, brand_id, categories_id) VALUES ($1, $2, $3, $4)",
      [name, price, brandID, catID]
    );
  } catch (err) {
    throw err;
  }
}

async function getProductById(id) {
  const { rows } = await pool.query(
    "SELECT products.name, products.price, brands.brand, categories.category FROM products LEFT JOIN brands ON products.brand_id = brands.id LEFT JOIN categories ON products.categories_id = categories.id WHERE products.id = $1",
    [id]
  );
  return rows[0];
}

async function updateProduct(name, price, brand_id, categories_id, id) {
  await pool.query(
    "UPDATE products SET name  = $1, price = $2, brand_id = $3, categories_id = $4 WHERE id = $5",
    [name, price, brand_id, categories_id, id]
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
