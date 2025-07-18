const Orders = require("../models/Order");
const Cart = require("../models/userCart");
const MyNotification = require("../models/Notification");
const User = require("../models/User");

async function handlePlaceOrders(req, res) {
  try {
    const { user, contact, cart } = req.body;
    if (!user || !contact || !cart) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Load cart w/ product + owner (we need product + seller info)
    const cartData = await Cart.findById(cart).populate({
      path: "items.product",
      populate: { path: "owner", select: "name email" },
    });
    if (!cartData) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (!cartData.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Snapshot items for order
    const orderItems = cartData.items.map((ci) => ({
      product: ci.product._id,
      quantity: ci.quantity,
    }));

    // Create order using snapshot
    const newOrder = await Orders.create({
      user,
      contact,
      items: orderItems,
    });

    // Notifications
    const buyer = await User.findById(user).select("name email");
    const sellers = new Map();
    cartData.items.forEach((item) => {
      const p = item.product;
      if (p?.owner?._id) {
        const ownerId = p.owner._id.toString();
        if (!sellers.has(ownerId)) {
          sellers.set(ownerId, { ownerId, productNames: [p.name] });
        } else {
          sellers.get(ownerId).productNames.push(p.name);
        }
      }
    });

    const notifications = [];
    for (const [ownerId, data] of sellers.entries()) {
      notifications.push({
        user: ownerId,
        message: `Your product(s) ${data.productNames.join(
          ", "
        )} have been ordered by ${buyer?.name || "a buyer"}.`,
        from: user,
      });
    }
    if (notifications.length) {
      await MyNotification.insertMany(notifications);
    }


    await Cart.deleteOne({ _id: cart });

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
      notificationsCreated: notifications.length,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      message: "Server error while placing order",
      error: error.message,
    });
  }
}

// Get My Orders (now populate items.product.owner)
async function getMyOrders(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Orders.find({ user: userId })
      .populate({
        path: "items.product",
        populate: { path: "owner", select: "name email" },
      })
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(200).json({ message: "No orders found", orders: [] });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    res.status(500).json({
      message: "Server error while fetching orders",
      error: error.message,
    });
  }
}

module.exports = { handlePlaceOrders, getMyOrders };
