const db = require("../database/query");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories;
  res.render("main", {
    categories,
  });
}

module.exports = {
  getAllCategories,
};
