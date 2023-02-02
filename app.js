import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/conn.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//setup express app
const app = express();

//MIDDLEWARES
//Get data and cokies from the frontend
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());

import dotenv from "dotenv";
dotenv.config();


const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());


import authRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import studentsRouter from "./routes/students.js";
import attendaceRouter from "./routes/attendance.js";
import coursesRouter from "./routes/courses.js";

//use user routes
app.use("/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/students", studentsRouter);
app.use("/api/attendance", attendaceRouter);
app.use("/api/courses", coursesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.DATABASE);
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`App is Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
