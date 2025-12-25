const db = require("../database/query");

async function getAllCategories(req, res) {
  try {
    const nonSort = await db.getAllCategories();
    const categories = nonSort.sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    res.render("main", {
      categories,
    });
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
}

async function getSelectedCategory(req, res) {
  const catID = req.params.id;
  try {
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
  res.render("createCategory", {
    error: null,
  });
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
      return res.render("updateCategory", {
        message: "category not found",
        error: null,
        category: null,
      });
    } else {
      return res.render("updateCategory", {
        category,
        message: null,
        error: null,
      });
    }
  } catch (error) {
    return res.render("updateCategory", {
      erro: error.message,
      message: null,
      category: null,
    });
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
      return res.render("updateCategory", { error: err.message });
    }
  }
}

async function deleteCategory(req, res) {
  const id = req.params.id;
  try {
    await db.deleteCategory(id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting category");
  }
}

// PROD METHODS

function getCreateProduct(req, res) {
  res.render("createProduct", { error: null });
}

async function postCreatedProduct(req, res) {
  const { name, price, brandName, categoryName } = req.body;
  try {
    await db.postProduct(name, price, brandName, categoryName);
    res.redirect("/");
  } catch (error) {
    return res.render("createProduct", {
      error: error.message,
    });
  }
}

async function getUpdateProduct(req, res) {
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      return res.render("updateProduct", {
        message: "There is no product",
        error: null,
        category: null,
      });
    }
    res.render("updateProduct", {
      product,
      message: null,
      error: null,
    });
  } catch (error) {
    res.render("updateProduct", {
      error: error.message,
      message: null,
      category: null,
    });
  }
}

async function postUpdateProduct(req, res) {
  const id = req.params.id;
  const { name, price, brand, category } = req.body;

  try {
    await db.updateProduct(name, price, brand, category, id);
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
