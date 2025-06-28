const Product = require("../models/Product");

const getProduct = async (req, res) => {
  console.log("hi");
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
    });
    if (!updated) return res.status(404).json({ error: "Product not found." });
    res.status(200).json({ msg: "success", updated });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const patchProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Product not found." });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to patch product." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Product not found." });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete product." });
  }
};

module.exports = {
  getProduct,
  putProduct,
  patchProduct,
  deleteProduct,
};
