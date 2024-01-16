import { Schema, model } from "mongoose";
import { UserType } from "../types/types";

const userSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

const User = model<UserType>("User", userSchema);
export { User };
