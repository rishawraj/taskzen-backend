import { Schema, model } from "mongoose";
import { ListType } from "../types/types";

const listSchema = new Schema<ListType>(
  {
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const List = model<ListType>("List", listSchema);

export { List };
