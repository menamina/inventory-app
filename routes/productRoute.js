const mainController = require("../controls/mainController");
const express = require("express");
const router = express.Router();

router.get("/:prodName/edit", mainController.getUpdateProduct);
router.post("/:prodName/edit", mainController.postUpdateProduct);

router.post("/:prodName/delete", mainController.deleteProduct);

module.exports = router;
