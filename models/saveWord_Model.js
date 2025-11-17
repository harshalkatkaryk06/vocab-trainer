import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  userid: { type: String, required: true },
});

// Compound unique index to allow same word if userid differs, but prevent duplicates per user
WordSchema.index({ userid: 1, word: 1 }, { unique: true });

export default mongoose.model("Word", WordSchema);
