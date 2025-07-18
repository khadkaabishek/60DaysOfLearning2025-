const express = require("express");
const router = express.Router();
const {
  handlePlaceOrders,
  getMyOrders,
} = require("./../controllers/handlePlaceOrders");
router.post("/place_order", handlePlaceOrders);
router.get("/my-orders/:userId", getMyOrders);
module.exports = router;
