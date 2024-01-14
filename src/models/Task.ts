import { Schema, model, connect, Types } from "mongoose";
import { TaskType } from "../types/types";

const taskSchema = new Schema<TaskType>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },

    title: { type: String, required: true },
    completed: { type: Boolean, default: false, required: true },
    description: { type: String },
    selectedListItem: { type: String },
    dueDate: { type: Date, default: null },
    tags: [{ id: { type: String }, name: { type: String } }],
    subTasks: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
          required: true,
        },
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);
const Task = model<TaskType>("Task", taskSchema);

export { Task };
