import { Schema, model, Document } from "mongoose";

export interface IPlaylist extends Document {
  name: string;
  itemUrls: string[];
  itemCount: number;
}

const playlistSchema = new Schema<IPlaylist>(
  {
    name: { type: String, required: true, unique: true, trim: true },

    itemUrls: {
      type: [String],
      validate: {
        validator: function (arr: string[]) {
          return arr.length <= 10;
        },
        message: "Maximum 10 URLs allowed",
      },
      default: [],
    },

    itemCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-calculate itemCount from itemUrls length
playlistSchema.pre("save", function (next) {
  this.itemCount = this.itemUrls?.length || 0;
  next();
});

export const Playlist = model<IPlaylist>("Playlist", playlistSchema);
