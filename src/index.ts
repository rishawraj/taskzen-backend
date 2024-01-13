import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { Mongoose } from "mongoose";
import bodyParser from "body-parser";
// import * as taskRoutes from "./routes/taskRoutes";
import taskRoutes from "./routes/taskRoutes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

console.log(process.env.PORT);

mongoose.connect(process.env.MONGODB_URI || "");

app.use(bodyParser.json());
// app.use("/api", taskRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`server is runnign on port ${PORT}`);
});
