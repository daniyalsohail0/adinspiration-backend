import mongoose, { Document, Schema } from "mongoose";
import { Collection, CollectionModel } from "./collectionsModel";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyType: string;
  userMessage: string;
  hireUGC: boolean;
  subscription: string;
  collections: Collection[] | Schema.Types.ObjectId[]; // Use either Collection[] or ObjectId[]
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true,
    default: "Other",
  },
  userMessage: {
    type: String,
    required: false,
    default: "Not provided by the user",
  },
  hireUGC: {
    type: Boolean,
    required: true,
    default: false,
  },
  subscription: {
    type: String,
    required: true,
    default: "Free",
  },
  collections: [
    { type: Schema.Types.ObjectId, ref: "Collection", required: false },
  ],
});

export default mongoose.model<IUser>("User", userSchema);
