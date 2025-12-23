const db = require("../database/query");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories;
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

function getUpdateCategory(req, res) {
  res.render("updateCategory");
}

async function postUpdateCategory(req, res) {}

function getDeleteCategory() {
  res.render("deleteCategory");
}

async function deleteCategory(req, res) {}

// PROD METHODS

function getCreateProduct(req, res) {
  res.render("createProduct");
}

async function postCreatedProduct(req, res) {
  const product = req.body.product;
  try {
    await db.postProduct(product);
    res.redirect("/");
  } catch (error) {
    if (error) {
      return res.render("createProduct", {
        error: "This product already exists",
      });
    }
  }
}

function getUpdateProduct() {
  red.render("updateProduct");
}

async function postUpdateProduct(req, res) {}

function getDeleteProduct() {
  res.render("deleteProduct");
}

async function deleteProduct(req, res) {}

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
  getDeleteCategory,
  getDeleteProduct,
};
