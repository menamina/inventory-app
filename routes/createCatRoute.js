const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/createCategory", mainController.getCreateCategory);
router.post("/createCategory", mainController.postCreatedCategory);

module.exports = router;
