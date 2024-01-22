import express from "express";
import * as taskController from "../controllers/taskController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

router.get("/tasks", authenticateToken, taskController.getAllTasks);
router.delete("/tasks", authenticateToken, taskController.deleteAllTasks);
router.post("/tasks", authenticateToken, taskController.createTask);
router.get("/tasks/:id", authenticateToken, taskController.getTaskById);
router.put("/tasks/:id", authenticateToken, taskController.updateTaskById);
router.delete("/tasks/:id", authenticateToken, taskController.deleteTaskById);

router.get("/tasks/:id/tags", authenticateToken, taskController.getAllTaskTags);

export default router;
