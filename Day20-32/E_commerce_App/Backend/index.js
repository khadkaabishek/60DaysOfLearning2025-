const express = require("express");
const app = express();
const PORT = 5001;
const { handleDBConnection } = require("./connection");
const authRoute = require("./routes/auth");
const cors = require("cors");
const addRoute = require("./routes/addItem");
const { protect, restrictTo } = require("./middlewares/auth");
const { getAllProducts } = require("./controllers/searchProduct.js");

handleDBConnection("mongodb://127.0.0.1:27017/E_Commerce")
  .then(() => console.log("Mongo Connected !!"))
  .catch((err) => {
    console.log(`Error encountered : ${err}`);
  });

app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/", authRoute);
app.get("/search_item", getAllProducts);
app.use("/api", addRoute);
app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});
