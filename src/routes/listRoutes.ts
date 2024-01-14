import express from "express";
import * as listController from "../controllers/listController";

const router = express.Router();

router.get("/lists", listController.getAllLists);
router.post("/lists", listController.createList);
router.get("/lists/:id", listController.getListById);
router.put("/lists/:id", listController.updateListById);
router.delete("/lists/:id", listController.deleteListById);

export default router;
