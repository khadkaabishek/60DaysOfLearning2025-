const Orders = require("../models/Order");
const Cart = require("../models/userCart");
const Product = require("../models/Product");
const MyNotification = require("../models/Notification");
const User = require("../models/User"); // Assuming you have User model

async function handlePlaceOrders(req, res) {
  try {
    const { user, contact, cart } = req.body;

    if (!user || !contact || !cart) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Orders({
      user,
      contact,
      cart,
    });
    await newOrder.save();

    const cartData = await Cart.findById(cart).populate({
      path: "items.product",
      populate: {
        path: "owner",
        select: "name email",
      },
    });

    if (!cartData) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const buyer = await User.findById(user).select("name email");

    const sellers = new Map();
    // console.log(cartData);

    cartData.items.forEach((item) => {
      if (item.product && item.product.owner) {
        const ownerId = item.product.owner._id.toString();
        if (!sellers.has(ownerId)) {
          sellers.set(ownerId, {
            ownerId,
            productNames: [item.product.name],
          });
        } else {
          sellers.get(ownerId).productNames.push(item.product.name);
        }
      }
    });

    const notifications = [];
    for (let [ownerId, data] of sellers.entries()) {
      const message = `Your product(s) ${data.productNames.join(
        ", "
      )} have been ordered by ${buyer.name}`;

      notifications.push({
        user: ownerId,
        message,
        from: user,
      });
    }
    // console.log(MyNotification);
    await MyNotification.insertMany(notifications);
    await Cart.deleteOne({ user });
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

module.exports = { handlePlaceOrders };
