import { Schema, model, Types } from "mongoose";
import { TaskType, SubTaskType, ListType } from "../types/types";

const subTaskSchema = new Schema<SubTaskType>({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    required: true,
  },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const listItemSchema = new Schema<ListType>({
  _id: Schema.Types.ObjectId,
  name: String,
});

const taskSchema = new Schema<TaskType>(
  {
    title: { type: String, required: true },
    completed: {
      type: Boolean,
      default: false,
      required: true,
      updatedAt: Date,
    },
    description: { type: String },
    selectedListItem: { type: listItemSchema },
    dueDate: { type: Date, default: null },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    subTasks: [subTaskSchema],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Task = model<TaskType>("Task", taskSchema);

export { Task };
