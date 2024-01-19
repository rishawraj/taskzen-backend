import { Request, Response } from "express";
import { User } from "../models/User";
import { UserType } from "../types/types";
// import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { Task } from "../models/Task";
import { List } from "../models/List";
import { Tag } from "../models/Tag";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id },
      JWT_SECRET_KEY
    );

    res.status(200).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body as UserType;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error Signing Up", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body as UserType;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating the user by ID:", error);
    res.status(500).json({ error: "Internal Sever Error" });
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // delete all tasks , list and tags associated with the user
    await Task.deleteMany({ user: userId });
    await List.deleteMany({ user: userId });
    await Tag.deleteMany({ user: userId });

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting the user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
