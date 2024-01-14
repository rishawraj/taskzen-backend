import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { Mongoose } from "mongoose";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";
import listRoutes from "./routes/listRoutes";
import tagRoutes from "./routes/tagRoutes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || "");

app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", listRoutes);
app.use("/api", tagRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
