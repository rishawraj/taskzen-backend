import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.createTask);
// router.put("/tasks/:id")
// router.delete("/tasks/:id")

export default router;
