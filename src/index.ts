import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import listRoutes from "./routes/listRoutes";
import tagRoutes from "./routes/tagRoutes";
import authRoutes from "./routes/authRoutes";
import compression from "compression";
import cors from "cors";
import fs from "fs";
import https from "node:https";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || "");

app.use(express.json());
app.use(compression());
app.use(cors());

const options = {
  key: fs.readFileSync("cert/key.pem"),
  cert: fs.readFileSync("cert/cert.pem"),
};

console.log(options);

app.use("/api", taskRoutes);
app.use("/api", listRoutes);
app.use("/api", tagRoutes);
app.use("/api", authRoutes);

const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
