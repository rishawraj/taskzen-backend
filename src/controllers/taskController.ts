import { Request, Response } from "express";
import { Task } from "../models/Task";
import { ConflictError, TaskType } from "../types/types";
import { Tag } from "../models/Tag";

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

    const taskData: Partial<TaskType> = req.body;

    const existingTask = await Task.findOne({
      title: taskData.title,
    });

    if (existingTask) {
      throw new ConflictError("Task with the same title already exists");
    }

    taskData.user = req.user.userId;

    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error instanceof ConflictError) {
      res
        .status(409)
        .json({ error: "Task with the same title already exists" });
    } else {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// delete all tasks
export const deleteAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const deletedTasks = await Task.deleteMany();

    res.status(201).json({ message: "All tasks deleted", deletedTasks });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all tasks
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    let updatedTaskData: Partial<TaskType> = req.body;

    // console.log(updatedTaskData);
    // console.log(updatedTaskData.selectedListItem);

    if (
      updatedTaskData.selectedListItem &&
      updatedTaskData.selectedListItem._id === ""
    ) {
      delete updatedTaskData.selectedListItem;
      const unsetField = {
        $unset: { selectedListItem: 1 },
      };
      updatedTaskData = { ...updatedTaskData, ...unsetField };
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true,
    });

    // console.log(updatedTask);

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

export const getAllTaskTags = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const tagIds = task.tags;

    const tags = await Tag.find({ _id: { $in: tagIds } });

    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
