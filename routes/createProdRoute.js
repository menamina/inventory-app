const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/createProduct", mainController.getCreateProduct);
router.post("/createProduct", mainController.postCreatedProduct);

router.get("/updateProduct", mainController.getUpdateProduct);
router.post("/updateProduct", mainController.postUpdateProduct);

router.post("/deleteProduct", mainController.deleteProduct);

module.exports = router;
