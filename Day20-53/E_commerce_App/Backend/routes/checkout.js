const express = require("express");
const router = express.Router();
const {
  getSellerOrders,
  handlePlaceOrders,
  getMyOrders,
} = require("./../controllers/handlePlaceOrders");
router.post("/place_order", handlePlaceOrders);
router.get("/my-orders/:userId", getMyOrders);
router.get("/seller-orders/:sellerId", getSellerOrders);
module.exports = router;
