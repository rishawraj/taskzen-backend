import { Request, Response } from "express";
import { Task } from "../models/Task";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    const task = new Task({ text });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
