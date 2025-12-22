const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/", mainController.getAllCategories);

module.exports = router;
