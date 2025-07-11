const express = require("express");
const router = express();
const { handleBecomeSeller } = require("./../controllers/handleBecomeSeller");
router.post("/:id", handleBecomeSeller);
module.exports = router;
