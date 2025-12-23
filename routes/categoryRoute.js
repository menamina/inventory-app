const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/newCategory", mainController.getCreateCategory);
router.post("/newCategory", mainController.postCreatedCategory);

router.get("/:id", mainController.getSelectedCategory);

router.get("/:id/edit", mainController.getUpdateCategory);
router.post("/:id/edit", mainController.postUpdateCategory);

router.post("/:id/delete", mainController.deleteCategory);

module.exports = router;
