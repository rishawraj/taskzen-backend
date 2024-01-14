import { Schema, Types, model } from "mongoose";
import { TagType } from "../types/types";

const tagSchema = new Schema<TagType>({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    required: true,
  },
  name: { type: String, required: true },
});

const Tag = model<TagType>("Tag", tagSchema);

export { Tag };
