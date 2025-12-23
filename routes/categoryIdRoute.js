const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/categories/:id", mainController.getSelectedCategory);

module.exports = router;
