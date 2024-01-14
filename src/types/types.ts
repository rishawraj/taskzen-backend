import { Types } from "mongoose";

export interface SubTaskType {
  _id: Types.ObjectId;
  title: string;
  completed: boolean;
}

export interface TagType {
  _id: Types.ObjectId;
  name: string;
}

export interface TaskType {
  _id: Types.ObjectId;
  title: string;
  completed: boolean;
  description?: string;
  selectedListItem?: string;
  dueDate?: Date;
  tags?: TagType[];
  subTasks?: SubTaskType[];
}

export interface ListType {
  _id: Types.ObjectId;
  name: string;
}

export interface TagType {
  _id: Types.ObjectId;
  name: string;
}
