const SellerInfo = require("../models/sellerInfo");

async function viewRequest(req, res) {
  try {
    const sellerInfo = await SellerInfo.find();
    return res.status(200).json(sellerInfo);
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
}

async function updateRequestStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedSeller = await SellerInfo.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res
      .status(200)
      .json({ message: `Seller ${status}`, seller: updatedSeller });
  } catch (error) {
    return res.status(500).json({ message: "Error updating status", error });
  }
}

module.exports = {
  viewRequest,
  updateRequestStatus,
};
