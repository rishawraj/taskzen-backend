import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.createTask);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTaskById);
router.delete("/tasks/:id", taskController.deleteTaskById);

export default router;
