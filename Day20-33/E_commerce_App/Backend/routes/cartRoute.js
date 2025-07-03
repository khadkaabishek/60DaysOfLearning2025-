const express = require("express");
const router = express.Router();
const { cartRoute } = require("./../controllers/cartController");
const Cart = require("./../models/userCart");
const Product = require("./../models/Product"); // ✅ Ensure it's registered

router.post("/", cartRoute);

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.json(cart);
  } catch (err) {
    console.error("Cart fetch error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
