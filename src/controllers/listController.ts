import { Request, Response } from "express";
import { List } from "../models/List";
import { ListType } from "../types/types";

export const createList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listData = req.body as ListType;
    const newList = new List(listData);
    const savedList = await newList.save();

    res.status(201).json(savedList);
  } catch (error) {
    console.error("Error creating List:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllLists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
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
    const listId = req.params.id;
    const updateListData = req.body as ListType;

    const updatedList = await List.findByIdAndUpdate(listId, updateListData, {
      new: true,
    });

    if (!updatedList) {
      res.status(404).json({ error: "List not found" });
      return;
    }

    res.status(200).json(updateListById);
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
    const listId = req.params.id;
    const deletedList = await List.findByIdAndDelete(listId);

    if (!deletedList) {
      res.status(404).json({ error: "List not found" });
      return;
    }
    res.status(200).json(deletedList);
  } catch (error) {
    console.error("Error deleting list by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
