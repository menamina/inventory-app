const db = require("../database/query");

async function getAllCategories(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("main", {
      categories,
    });
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
}

async function getSelectedCategory(req, res) {
  try {
    const catID = req.params.id;
    const products = await db.getProductsByCategory(catID);
    res.render("categoryItems", {
      products,
    });
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
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
  try {
    const category = await db.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.render("updateCategory", {
      category,
    });
  } catch (error) {
    res.status(500).send("Error fetching category");
  }
}

async function postUpdateCategory(req, res) {
  const id = req.params.id;
  const categoryName = req.body.category;
  try {
    await db.updateCategory(categoryName, id);
    res.redirect("/");
  } catch (err) {
    if (err) {
      return res.render("updateCategory", { error: err });
    }
  }
}

async function deleteCategory(req, res) {
  try {
    const id = req.params.id;
    await db.deleteCategory(id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting category");
  }
}

// PROD METHODS

function getCreateProduct(req, res) {
  res.render("createProduct");
}

async function postCreatedProduct(req, res) {
  const { name, price, brand_id, category_id } = req.body;
  try {
    await db.postProduct(name, price, brand_id, category_id);
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
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("updateProduct", {
      product,
    });
  } catch (error) {
    res.status(500).send("Error fetching product");
  }
}

async function postUpdateProduct(req, res) {
  const id = req.params.id;
  const { name, price, brand_id, category_id } = req.body;

  try {
    await db.updateProduct(name, price, brand_id, category_id, id);
    res.redirect("/");
  } catch (err) {
    if (err) {
      return res.render("updateProduct", { error: err });
    }
  }
}

async function deleteProduct(req, res) {
  try {
    await db.deleteProduct(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
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
