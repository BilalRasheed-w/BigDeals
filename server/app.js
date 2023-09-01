import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.send("<h1>hello from backend from app.js</h1>");
});

export default app;
