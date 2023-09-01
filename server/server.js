import app from "./app.js";
import dotenv from "dotenv";
dotenv.config("");

app.listen(process.env.PORT, () => {
  console.log("server is started", `http://localhost:${process.env.PORT}`);
});
