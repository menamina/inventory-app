const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/createCategory", mainController.getCreateCategory);
router.post("/createCategory", mainController.postCreatedCategory);

router.get("/updateCategory", mainController.getUpdateCategory);
router.post("/updateCategory", mainController.postUpdateCategory);

router.post("/deleteCategory", mainController.deleteCategory);

module.exports = router;
