const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: false },
    quantityAvailable: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);
const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
