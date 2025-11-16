import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  userid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Word', wordSchema);
