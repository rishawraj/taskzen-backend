import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);

router.put("/user/:id", userController.updateUserById);
router.delete("/user/:id", userController.deleteUserById);

export default router;
