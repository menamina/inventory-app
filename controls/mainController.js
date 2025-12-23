const db = require("../database/query");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("main", {
    categories,
  });
}

async function getSelectedCategory(req, res) {
  const catID = req.params.id;
  const products = await db.getProductsByCategory(catID);
  res.render("categoryItems", {
    products,
  });
}

// CAT METHODS

function getCreateCategory(req, res) {
  res.render("createCategory");
}

async function postCreatedCategory(req, res) {
  const category = req.body.category;
  try {
    await db.postCategory(category);
    res.redirect("/");
  } catch (error) {
    if (error) {
      return res.render("createCategory", {
        error: "This category already exists",
      });
    }
  }
}

async function getUpdateCategory(req, res) {
  const category = await db.getCategoryById(req.params.id);
  res.render("updateCategory", {
    category,
  });
}

async function postUpdateCategory(req, res) {
  const id = req.params.id;
  const categoryName = req.body.category;
  try {
    await db.updateCategory(categoryName, id);
    res.redirect("/");
  } catch (err) {
    if (err) {
      res.render("updateCategory", { error: err });
    }
  }
}

async function deleteCategory(req, res) {
  const id = req.params.id;
  await db.deleteCategory(id);
  res.redirect("/");
}

// PROD METHODS

function getCreateProduct(req, res) {
  res.render("createProduct");
}

async function postCreatedProduct(req, res) {
  const { name, price, brand, category } = req.body;
  try {
    await db.postProduct(name, price, brand, category);
    res.redirect("/");
  } catch (error) {
    if (error) {
      return res.render("createProduct", {
        error: "This product already exists",
      });
    }
  }
}

async function getUpdateProduct(req, res) {
  const product = await db.getProductById(req.params.id);
  res.render("updateProduct", {
    product,
  });
}

async function postUpdateProduct(req, res) {
  const id = req.params.id;
  const { name, price, brand, category } = req.body;

  try {
    await db.updateProduct(name, price, brand, category, id);
    res.redirect("/");
  } catch (err) {
    if (err) {
      res.render("updateProduct", { error: err });
    }
  }
}

async function deleteProduct(req, res) {
  await db.deleteProduct(req.params.id);
  res.redirect("/");
}

// exports

module.exports = {
  getAllCategories,
  getSelectedCategory,
  getCreateCategory,
  getCreateProduct,
  postCreatedCategory,
  postCreatedProduct,
  postUpdateCategory,
  deleteCategory,
  postUpdateProduct,
  deleteProduct,
  getUpdateCategory,
  getUpdateProduct,
};
