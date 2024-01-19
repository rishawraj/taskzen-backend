import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import * as listController from "../controllers/listController";

const router = express.Router();

router.get("/lists", authenticateToken, listController.getAllLists);
router.delete("/lists", authenticateToken, listController.deleteAllLists);
router.post("/lists", authenticateToken, listController.createList);
router.get("/lists/:id", authenticateToken, listController.getListById);
router.put("/lists/:id", authenticateToken, listController.updateListById);
router.delete("/lists/:id", authenticateToken, listController.deleteListById);

export default router;
