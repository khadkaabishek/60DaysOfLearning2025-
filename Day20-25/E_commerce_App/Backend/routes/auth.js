const express = require("express");
const router = express();
const { handleSignup } = require("./../controllers/signup.js");
const { handleLogin } = require("./../controllers/login.js");
router.post("/signup", handleSignup);
router.post("/login", handleLogin);
module.exports = router;
