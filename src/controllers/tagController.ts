import { Request, Response } from "express";
import { Tag } from "../models/Tag";
import { TagType } from "../types/types";

export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tagData = req.body as TagType;
    tagData.user = req.user.userId;
    const newTag = new Tag(tagData);
    const savedTag = await newTag.save();

    res.status(201).json(savedTag);
  } catch (error) {
    console.error("Error creating Tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllTags = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tags = await Tag.find({ user: req.user.userId });
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error getting Tags:", error);
  }
};

export const getTagById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tagId = req.params.id;
    const tag = await Tag.findById(tagId);

    if (!tag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error("Error getting tag by ID:", error);
  }
};

export const updateTagById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tagId = req.params.id;
    const updatedTagData = req.body as TagType;

    const updatedTag = await Tag.findByIdAndUpdate(tagId, updatedTagData, {
      new: true,
    });

    if (!updatedTag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (error) {
    console.error("Error updating tag by ID", error);
    res.status(500).json({ error: "Internal Sever Error" });
  }
};

export const deleteTagById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tagId = req.params.id;
    const deletedTag = await Tag.findByIdAndDelete(tagId);
    if (!deletedTag) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(deletedTag);
  } catch (error) {
    console.error("Error deleting tag by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
