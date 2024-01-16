import express from "express";
import mongoose from "mongoose";
// import taskRoutes from "./routes/taskRoutes.js";
import taskRoutes from "./routes/taskRoutes";
import listRoutes from "./routes/listRoutes";
import tagRoutes from "./routes/tagRoutes";
import authRoutes from "./routes/authRoutes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || "");

app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", listRoutes);
app.use("/api", tagRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
