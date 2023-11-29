import { Schema, Document, model } from "mongoose";

export interface Collection extends Document {
  name: string;
  description: string;
  videoURLs: string[];
  createdAt: Date;
}

const collectionSchema = new Schema<Collection>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoURLs: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const CollectionModel = model<Collection>(
  "Collection",
  collectionSchema
);
