import { Schema, model, Types } from "mongoose";
import { TaskType, SubTaskType } from "../types/types";

const subTaskSchema = new Schema<SubTaskType>({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    required: true,
  },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new Schema<TaskType>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false, required: true },
    description: { type: String },
    selectedListItem: { type: Schema.Types.ObjectId, ref: "List" },
    dueDate: { type: Date, default: null },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    subTasks: [subTaskSchema],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);
const Task = model<TaskType>("Task", taskSchema);

export { Task };
