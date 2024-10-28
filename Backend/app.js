import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
import userRouter from "./src/routes/user.route.js";
import blogRouter from "./src/routes/blog.route.js";
import messageRouter from "./src/routes/message.route.js"

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/message", messageRouter);

// Error middleware
app.use((req, res, next) => {
  const { statuscode, message, data } = err;
  return res.status(statuscode || 500).json({
    success: false,
    message: message || "Internal server error",
    data: data || null,
  });
});

export default app;
