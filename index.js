import "express-async-errors";
import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import auth_router from "./routers/auth_router.js";
import todo_router from "./routers/todo_router.js";

import { error_handler } from "./middlewares/error_handler.js";
import { corsOptions } from "./configs/cors_options.js";

//configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors(corsOptions));

//routers
app.use("/todolist/authentication", auth_router);
app.use("/todolist/todo", todo_router);

//Errors
app.use(error_handler);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

const PORT = process.env.PORT;

try {
  await mongoose.connect(process.env.MONGOURL);
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT:${PORT}`);
  });
} catch (error) {
  process.exit(1);
}
