const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);


app.use(express.json());


app.get("/api/test", (req, res) => {
  res.json({ message: "CORS working!" });
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
