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

function getCreateProduct(req, res) {
  res.render("createProduct");
}

module.exports = {
  getAllCategories,
  getSelectedCategory,
  getCreateCategory,
  getCreateProduct,
};
