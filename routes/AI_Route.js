import express from 'express';
import { searchWords } from '../controllers/searchWords.js';
import { Gen_Quizes } from '../controllers/Gen_Quizes.js';
import { checkQuizAnswer } from '../controllers/Check_Quizes.js';  
import {isAuth} from '../middlewares/isAuth.js';
const router = express.Router();

router.post('/word', isAuth,searchWords);  // POST /search_words/
router.post('/gen_quizes', isAuth,Gen_Quizes);
router.post('/check_quiz', isAuth,checkQuizAnswer);  


export default router;