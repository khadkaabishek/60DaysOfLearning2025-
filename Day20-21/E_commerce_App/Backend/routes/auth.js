const express = require("express");
const router = express();
const { handleSignup } = require("./../controllers/signup.js");
router.post("/signup", handleSignup);

module.exports = router;
