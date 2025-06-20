const express = require("express");
const app = express();
const PORT = 3001;
const { handleDBConnection } = require("./connection");

handleDBConnection("mongodb://127.0.0.1:27017/E_Commerce")
  .then(() => console.log("Mongo Connected !!"))
  .catch((err) => {
    console.log(`Error encountered : ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});
