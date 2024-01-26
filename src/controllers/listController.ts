import { Request, Response } from "express";
import { List } from "../models/List";
import { ConflictError, ListType } from "../types/types";
import { Task } from "../models/Task";

export const createList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const listData = req.body as ListType;

    const existingList = await List.findOne({
      name: listData.name,
    });

    if (existingList) {
      throw new ConflictError("List with the same name already exists");
    }

    listData.user = req.user.userId;

    const newList = new List(listData);
    const savedList = await newList.save();

    res.status(201).json(savedList);
  } catch (error) {
    if (error instanceof ConflictError) {
      res.status(409).json({ error: "List with the same nmae already exists" });
    } else {
      console.error("Error creating List:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getAllLists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const lists = await List.find({ user: req.user.userId });
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error getting Lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAllLists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const deletedLists = await List.deleteMany();

    // Remove selectedListItem from all Tasks

    await Task.updateMany(
      { user: req.user.userId }, // Update all tasks for the logged-in user
      { $unset: { selectedListItem: "" } } // Remove the selectedListItem field
    );

    res.status(200).json({ message: "All Lists deleted", deletedLists });
  } catch (error) {
    console.error("Error getting Lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getListById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const listId = req.params.id;

    const list = await List.findById(listId);
    if (!list) {
      res.status(404).json({ error: "List not found" });
      return;
    }

    res.status(200).json(list);
  } catch (error) {
    console.error("Error getting list by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateListById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const listId = req.params.id;
    const updateListData = req.body as ListType;

    const updatedList = await List.findByIdAndUpdate(listId, updateListData, {
      new: true,
    });

    if (!updatedList) {
      res.status(404).json({ error: "List not found" });
      return;
    }

    res.status(200).json(updatedList);
  } catch (error) {
    console.error("Error updating list by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteListById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const listId = req.params.id;
    const deletedList = await List.findByIdAndDelete(listId);

    if (!deletedList) {
      res.status(404).json({ error: "List not found" });
      return;
    }

    // Remove list refrence from tasks
    const message = await Task.updateMany(
      { selectedListItem: { _id: deletedList._id, name: deletedList.name } },
      { $unset: { selectedListItem: 1 } }
    );

    res.status(200).json({ deletedList: deletedList, updatedTasks: message });
  } catch (error) {
    console.error("Error deleting list by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
