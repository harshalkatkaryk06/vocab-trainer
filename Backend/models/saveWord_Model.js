import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  pronunciation: { type: String },
  examples: { type: [String] },
  userid: { type: String, required: true },
});

WordSchema.index({ userid: 1, word: 1 }, { unique: true });

export default mongoose.model("Word", WordSchema);




