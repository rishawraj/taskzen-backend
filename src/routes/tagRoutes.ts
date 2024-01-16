import express from "express";
import * as tagController from "../controllers/tagController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

router.get("/tags", authenticateToken, tagController.getAllTags);
router.post("/tags", authenticateToken, tagController.createTag);
router.get("/tags/:id", authenticateToken, tagController.getTagById);
router.put("/tags/:id", authenticateToken, tagController.updateTagById);
router.delete("/tags/:id", authenticateToken, tagController.deleteTagById);

export default router;
