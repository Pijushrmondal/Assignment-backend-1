import { Schema, model, Document } from "mongoose";

export interface IScreen extends Document {
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const screenSchema = new Schema<IScreen>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Regular index for efficient regex search (case-insensitive)
screenSchema.index({ name: 1 });

export const Screen = model<IScreen>("Screen", screenSchema);
