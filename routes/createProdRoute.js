const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/createProduct", mainController.getCreateProduct);
router.post("/createProduct", mainController.postCreatedProduct);

router.get("/updateProduct/:id", mainController.getUpdateProduct);
router.post("/updateProduct/:id", mainController.postUpdateProduct);

router.post("/deleteProduct/:id", mainController.deleteProduct);

module.exports = router;
