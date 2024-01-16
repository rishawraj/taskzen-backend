import express from "express";
import * as taskController from "../controllers/taskController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

router.get("/tasks", authenticateToken, taskController.getAllTasks);
router.post("/tasks", authenticateToken, taskController.createTask);
router.get("/tasks/:id", authenticateToken, taskController.getTaskById);
router.put("/tasks/:id", authenticateToken, taskController.updateTaskById);
router.delete("/tasks/:id", authenticateToken, taskController.deleteTaskById);

export default router;
