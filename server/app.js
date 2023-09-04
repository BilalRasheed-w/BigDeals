import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
import ProductRoute from "./routes/productR.js";
import UserRoute from "./routes/UserR.js";

// middlewares
import { errMiddleware } from "./Error/globalError.js";

app.use("/api", ProductRoute);
app.use("/api", UserRoute);

app.use(errMiddleware);

export default app;
