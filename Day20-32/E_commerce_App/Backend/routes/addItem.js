const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const upload = require("../middlewares/upload");
const {
  getProduct,
  putProduct,
  patchProduct,
  deleteProduct,
  getSingleItem,
} = require("./../controllers/productManipulate");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/add_item",
  upload.single("image"),
  protect,
  restrictTo("admin"),
  createProduct
);
router.get("/get_item", getProduct);
router.get("/get-item/:id", getSingleItem);
router.put("/put_item/:id", protect, restrictTo("admin"), putProduct);
router.patch("/patch_item/:id", protect, restrictTo("admin"), patchProduct);
router.delete("/delete_item/:id", protect, restrictTo("admin"), deleteProduct);

module.exports = router;
