const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/newCategory", mainController.getCreateCategory);
router.post("/newCategory", mainController.postCreatedCategory);

router.get("/:name", mainController.getSelectedCategory);

router.get("/:name/edit", mainController.getUpdateCategory);
router.post("/:name/edit", mainController.postUpdateCategory);

router.post("/:name/delete", mainController.deleteCategory);

module.exports = router;
