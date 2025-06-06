import express, { Request, Response } from "express";
const app = express();
const PORT = 3000;


app.get("/", (req: any, res: any) => {
    console.log(`Request data : ${Request}`);
    // console.log(`Response data : ${Response}`);
  return res.json({
    msg: "get Request on /",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
