import { Schema, model } from "mongoose";
import { TagType } from "../types/types";

const tagSchema = new Schema<TagType>(
  {
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Tag = model<TagType>("Tag", tagSchema);

export { Tag };
