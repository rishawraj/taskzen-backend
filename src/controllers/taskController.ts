import { Request, Response } from "express";
// import { Task } from "../models/Task";
import { Task } from "../models/Task";
import { TaskType } from "../types/types";

// Create a new task
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const taskData = req.body as TaskType;
    taskData.user = req.user.userId;

    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all tasks
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("getallTasks called");

  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userID = req.user.userId;

    const tasks = await Task.find({ user: userID });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific task by ID
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("getTaskById called");

  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a task by ID
export const updateTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body as TaskType;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true,
    });

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a task by ID
export const deleteTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Error deleting task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
