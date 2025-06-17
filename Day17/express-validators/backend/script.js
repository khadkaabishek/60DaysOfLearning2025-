const express = require("express");
const cors = require("cors");
const registerValidator = require("./registervalidator");
const validate = require("./validate");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", registerValidator, validate, (req, res) => {
  res.json({ message: "User registered successfully!", data: req.body });
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));
