import mongoose from 'mongoose';

const createUser = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userid: { type: String, unique: true },
  age: { type: Number, required: true },
  savedWords: [
    {
      word: String,
      meaning: String,
      pronunciation: String,
      examples: [String],
    }
  ],
}, { collection: 'users' });

const User = mongoose.model('User', createUser);
export default User;
