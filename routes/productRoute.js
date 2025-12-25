const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/newProduct", mainController.getCreateProduct);
router.post("/newProduct", mainController.postCreatedProduct);

router.get("/:id", mainController.getProductsByCategory);

router.get("/:id/edit", mainController.getUpdateProduct);
router.post("/:id/edit", mainController.postUpdateProduct);

router.post("/:id/delete", mainController.deleteProduct);

module.exports = router;
