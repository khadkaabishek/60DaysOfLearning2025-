import express, { Request, Response } from "express";
const req:Request;
const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
    console.log(res);
  return res.json({
    msg: "get Request on /",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
