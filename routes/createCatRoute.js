const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/createCategory", mainController.getCreateCategory);
router.post("/createCategory", mainController.postCreatedCategory);

router.get("/updateCategory/:id", mainController.getUpdateCategory);
router.post("/updateCategory/:id", mainController.postUpdateCategory);

router.post("/deleteCategory/:id", mainController.deleteCategory);

module.exports = router;
