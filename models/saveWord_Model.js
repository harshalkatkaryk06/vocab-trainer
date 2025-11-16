import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  userid: { type: String, required: true },
});

// Unique for each user
WordSchema.index({ word: 1, userid: 1 }, { unique: true });

export default mongoose.model("Word", WordSchema);
