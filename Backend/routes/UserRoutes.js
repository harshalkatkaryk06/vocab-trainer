import express from 'express';
import { registerUser } from '../controllers/createUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { isAuth } from '../middlewares/isAuth.js';
import { fetchWord } from '../controllers/fetchWords.js';
import { deleteWord } from '../controllers/deleteWord.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/fetchWords', isAuth, fetchWord);
router.post('/deleteWord', isAuth, (req, res, next) => {
  console.log("DeleteWord route hit");
  next();
}, deleteWord);






export default router;
