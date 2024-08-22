import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";

import { db_connect } from "./config/db.js";

import { errorHandler } from "./utils/error.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config();
const app: Express = express();
import { authMiddleware } from "./middleware/index.js";
import indexRouter from "./routes/index.js";

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://sales-frontend-iota.vercel.app",
      `${process.env.CLIENT_URL}`,
    ],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/v1", authMiddleware, indexRouter);
app.get("/home", (req, res) => {
  res.send("hello world");
});
db_connect();
app.use(errorHandler);

app.use("/*", (req, res) => {
  res.status(400).json({
    code: 400,
    message: "This Route does not exist. Please Provide the correct route",
  });
});

export default app;
