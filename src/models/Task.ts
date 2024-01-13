import { Schema, model, connect } from "mongoose";

interface Task {
  title: string;
  completed: boolean;
}

const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const Task = model<Task>("Task", taskSchema);

export { Task };
