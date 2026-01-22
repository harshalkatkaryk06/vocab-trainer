import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: String,
  pronunciation: String,
  examples: [String],
  userid: { type: String, required: true }
}, { collection: 'users' });


const Word = mongoose.models.Word || mongoose.model('Word', wordSchema);

export default Word;
