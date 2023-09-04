import app from "./app.js";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
dotenv.config("");

app.listen(process.env.PORT, () => {
  console.log("server is started", `http://localhost:${process.env.PORT}`);
});

ConnectDB();


