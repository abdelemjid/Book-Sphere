import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routers/UserRouter";
import adminRouter from "./routers/AdminRouter";

const app = express();

// connect mongodb
const uri = process.env.MONGODB_CONNECTION_STRING as string;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB is connected."))
  .catch((error) => console.error(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (process.env.FRONTEND_URL_ADDRESS as string) || "",
    credentials: true,
  })
);
app.use(cookieParser());

// app routers
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.listen(7000, () => {
  console.log("Server Running on http://localhost:7000");
});
