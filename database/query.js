const pool = require("./pool");

// CRUD

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getProductsByCategory(catName) {
  const { rows } = await pool.query(
    "SELECT products.id, products.name, products.price, brands.brand, categories.category, products.quantity FROM products LEFT JOIN brands ON products.brand_id = brands.id LEFT JOIN categories ON products.categories_id = categories.id WHERE categories.category = $1",
    [catName]
  );
  return rows;
}

async function updateCategory(category, currentName) {
  await pool.query("UPDATE categories SET category = $1 WHERE category = $2", [
    category,
    currentName,
  ]);
}

async function deleteCategory(categoryName) {
  try {
    const { rows } = await pool.query(
      "SELECT id FROM categories WHERE category = $1",
      [categoryName]
    );
    if (rows.length === 0) return;
    const categoryId = rows[0].id;
    await pool.query("DELETE FROM products WHERE categories_id = $1", [
      categoryId,
    ]);
    await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
  } catch (error) {
    throw error;
  }
}

async function getCategoryByName(categoryName) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE category = $1",
    [categoryName]
  );
  return rows[0];
}

async function postCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function postProduct(name, price, brandName, categoryName, quantity) {
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
      "INSERT INTO products (name, price, brand_id, categories_id, quantity) VALUES ($1, $2, $3, $4, $5)",
      [name, price, brandID, catID, quantity]
    );
    return categoryName;
  } catch (err) {
    throw err;
  }
}

async function getProductByName(name) {
  const { rows } = await pool.query(
    "SELECT products.id, products.name, products.price, brands.brand, categories.category, products.quantity FROM products LEFT JOIN brands ON products.brand_id = brands.id LEFT JOIN categories ON products.categories_id = categories.id WHERE products.name = $1",
    [name]
  );
  return rows[0];
}

async function updateProduct(
  name,
  price,
  brand,
  category,
  quantity,
  currentName
) {
  let brandID;
  let catID;

  const brandRow = await pool.query(
    "SELECT id FROM brands WHERE brands.brand = $1",
    [brand]
  );
  if (brandRow.rows.length === 0) {
    const createBrand = await pool.query(
      "INSERT INTO brands (brand) VALUES ($1) RETURNING id ",
      [brand]
    );
    brandID = createBrand.rows[0].id;
  } else {
    brandID = brandRow.rows[0].id;
  }
  const catRow = await pool.query(
    "SELECT id FROM categories WHERE categories.category = $1",
    [category]
  );
  if (catRow.rows.length === 0) {
    const createCat = await pool.query(
      "INSERT INTO categories (category) VALUES ($1) RETURNING id",
      [category]
    );
    catID = createCat.rows[0].id;
  } else {
    catID = catRow.rows[0].id;
  }

  try {
    await pool.query(
      "UPDATE products SET name  = $1, price = $2, brand_id = $3, categories_id = $4, quantity = $5 WHERE name = $6",
      [name, price, brandID, catID, quantity, currentName]
    );
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productName) {
  await pool.query("DELETE FROM products WHERE name = $1", [productName]);
}

module.exports = {
  getAllCategories,
  getProductsByCategory,
  postCategory,
  postProduct,
  getCategoryByName,
  getProductByName,
  updateProduct,
  updateCategory,
  deleteProduct,
  deleteCategory,
};
