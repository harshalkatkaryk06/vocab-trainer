import express from 'express';
import { registerUser } from '../controllers/createUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { isAuth } from '../middlewares/isAuth.js';
import Word from '../models/saveWord_Model.js';
import { fetchWord } from '../controllers/fetchWords.js';

const router = express.Router();

// User registration and login routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Route to fetch words for the logged-in user
router.get('/fetchWords', isAuth, fetchWord);

export default router;
