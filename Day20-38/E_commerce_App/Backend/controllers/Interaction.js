const { JWTVerify } = require("../middlewares/auth");
const Interaction = require("../models/interactions");

async function postInteraction(req, res) {
  try {
    const { isLiked, comment } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    const user = await JWTVerify(token);

    const userId = user.userId;

    const { id } = req.params;

    const newInteraction = new Interaction({
      isLiked: isLiked,
      comment: comment,
      product: id,
      user: userId,
    });
    console.log(newInteraction);
    await newInteraction.save();
    return res.status(201).json({ msg: "New comment added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getInteraction(req, res) {
  console.log("object");
  try {
    const allInteraction = await Interaction.find().sort({ createdAt: -1 });
    console.log(allInteraction);
    return res.status(200).json(allInteraction);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = { postInteraction, getInteraction };
