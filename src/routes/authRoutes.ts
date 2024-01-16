import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();
// signup
router.post("/login", userController.login);
router.post("/signup", userController.signup);

// login

// get user

// update user

// logout

export default router;
