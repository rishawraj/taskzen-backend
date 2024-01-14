import express from "express";
import * as tagController from "../controllers/tagController";

const router = express.Router();

router.get("/tags", tagController.getAllTags);
router.post("/tags", tagController.createTag);
router.get("/tags/:id", tagController.getTagById);
router.put("/tags/:id", tagController.updateTagById);
router.delete("/tags/:id", tagController.deleteTagById);

export default router;
