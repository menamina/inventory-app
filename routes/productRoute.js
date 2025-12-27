const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/newProduct", mainController.getCreateProduct);
router.post("/newProduct", mainController.postCreatedProduct);

router.get("/:prodName/edit", mainController.getUpdateProduct);
router.post("/:prodName/edit", mainController.postUpdateProduct);

router.post("/:prodName/delete", mainController.deleteProduct);

module.exports = router;
