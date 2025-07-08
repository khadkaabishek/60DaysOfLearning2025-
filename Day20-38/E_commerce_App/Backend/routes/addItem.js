const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const upload = require("../middlewares/upload");
const {
  getProduct,
  getMyItems,
  putProduct,
  patchProduct,
  deleteProduct,
  getSingleItem,
} = require("./../controllers/productManipulate");
const {
  postInteraction,
  getInteraction,
} = require("../controllers/Interaction");
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
router.put(
  "/put_item/:id",
  protect,
  restrictTo("admin"),
  upload.array("images", 5),
  putProduct
);

router.get("/:id/interaction", getInteraction);
router.post("/:id/interaction", postInteraction);

router.get("/:id/get-my-items", getMyItems);
router.patch("/patch_item/:id", protect, restrictTo("admin"), patchProduct);
router.delete("/delete_item/:id", protect, restrictTo("admin"), deleteProduct);

module.exports = router;
