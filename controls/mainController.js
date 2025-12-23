const db = require("../database/query");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories;
  res.render("main", {
    categories,
  });
}

async function getSelectedCategory(req, res) {
  const catID = req.params.id;
  const catProducts = await db.getProductsByCategory(catID);
  res.render("categoryItems", {
    catProducts,
  });
}

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

module.exports = {
  getAllCategories,
  getSelectedCategory,
  getCreateCategory,
  getCreateProduct,
  postCreatedCategory,
  postCreatedProduct,
};
