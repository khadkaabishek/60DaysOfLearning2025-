const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const upload = require("../middlewares/upload");

router.post("/add_item", upload.single("image"), createProduct);

module.exports = router;
