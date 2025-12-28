const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/newCategory", mainController.getCreateCategory);
router.post("/newCategory", mainController.postCreatedCategory);

router.get("/:category/newProduct", mainController.getCreateProduct);
router.post("/:category/newProduct", mainController.postCreatedProduct);

router.get("/:category/:prodName/edit", mainController.getUpdateProduct);
router.post("/:category/:prodName/edit", mainController.postUpdateProduct);
router.post("/:category/:prodName/delete", mainController.deleteProduct);

router.get("/:category", mainController.getSelectedCategory);

router.get("/:name/edit", mainController.getUpdateCategory);
router.post("/:name/edit", mainController.postUpdateCategory);

router.post("/:name/delete", mainController.deleteCategory);

module.exports = router;
