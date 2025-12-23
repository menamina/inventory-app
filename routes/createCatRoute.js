const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/createCategory", mainController.getCreateCategory);
router.get("/createProduct", mainController.getCreateProduct);

module.exports = router;
