import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";

import { db_connect } from "./config/db";
import { authMiddleware } from "./middleware";
import indexRouter from "./routes";
import { errorHandler } from "./utils";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config();
const app: Express = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use("/api/v1", authMiddleware, indexRouter);

app.use("/*", (req, res) => {
  res.status(400).json({
    code: 400,
    message: "This Route does not exist. Please Provide the correct route",
  });
});
db_connect();
app.use(errorHandler);
export default app;
