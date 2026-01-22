import express from 'express';
import { registerUser } from '../controllers/createUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { isAuth } from '../middlewares/isAuth.js';
import { fetchWord } from '../controllers/fetchWords.js';
import { deleteWord } from '../controllers/deleteWord.js';
import { wordOfTheDay } from '../controllers/wordOfTheDay.js';
import saveWordsController from '../controllers/saveWordsController.js';
import bcrypt from "bcryptjs";
// At TOP of UserRoutes.js - ADD THESE
import User from "../models/user.js";
import Word from "../models/saveWord_Model.js";

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/fetchWords', isAuth, fetchWord);
router.post('/deleteWord', isAuth, (req, res, next) => {
  console.log("DeleteWord route hit");
  next();
}, deleteWord);

router.get('/word_of_the_day', isAuth, wordOfTheDay);
router.use('/save-words', isAuth, saveWordsController);

router.get("/profile", isAuth, async (req, res) => {
  try {
    const { userid } = req.user;
    
    const user = await User.findOne({ userid }).select('username email age');
    
    const savedWordsCount = await Word.countDocuments({ userid });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      user: {
        username: user.username,
        email: user.email,
        age: user.age
      },
      savedWordsCount 
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});




router.put("/profile", isAuth, async (req, res) => {
  try {
    const { userid } = req.user;
    const { username, email, age } = req.body;

    if (!username || !email || !age) {
      return res.status(400).json({ error: "username, email, and age are required" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { userid },
      { username, email, age },
      { new: true, runValidators: true, select: "username email age" }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});



router.post("/forget-password", async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
      return res.status(400).json({ error: "Username and new password required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Forget password error:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
});


export default router;
