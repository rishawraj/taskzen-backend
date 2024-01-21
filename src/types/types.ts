import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        userId: Types.ObjectId;
        iat: number;
      };
    }
  }
}

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
  subTasks?: SubTaskType[];
  selectedListItem?: Types.ObjectId;
  dueDate?: Date;
  tags?: Types.ObjectId[];
  user: Types.ObjectId;
}

export interface ListType {
  _id: Types.ObjectId;
  name: string;
  tasks?: Types.ObjectId[];
  user?: Types.ObjectId;
}

export interface TagType {
  _id: Types.ObjectId;
  name: string;
  tasks: Types.ObjectId[];
  user: Types.ObjectId;
}

export interface UserType {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  tasks: Types.ObjectId[];
  lists: Types.ObjectId[];
  tags: Types.ObjectId[];
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}
