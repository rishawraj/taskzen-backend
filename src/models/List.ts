import { Schema, Types, model } from "mongoose";
import { ListType } from "../types/types";

const listSchema = new Schema<ListType>({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    required: true,
  },
  name: { type: String, required: true },
});

const List = model<ListType>("List", listSchema);

export { List };
