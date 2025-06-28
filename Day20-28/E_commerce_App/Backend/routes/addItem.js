const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const upload = require("../middlewares/upload");
const {
  getProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} = require("./../controllers/productManipulate");
const { protect } = require("../middlewares/auth");
router.post("/add_item", upload.single("image"), createProduct);
router.get("/get_item", getProduct);
router.put("/put_item/:id", putProduct);
router.patch("/patch_item/:id", patchProduct);
router.delete("/delete_item/:id", deleteProduct);

module.exports = router;
