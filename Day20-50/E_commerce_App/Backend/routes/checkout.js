const express = require("express");
const router = express.Router();
const { handlePlaceOrders } = require("./../controllers/handlePlaceOrders");
router.post("/place_order", handlePlaceOrders);
module.exports = router;
