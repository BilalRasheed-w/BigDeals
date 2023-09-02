import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import ProductRoute from "./routes/productR.js";
import { errMiddleware } from "./Error/globalError.js";

app.use("/api", ProductRoute);

app.use(errMiddleware);

export default app;
