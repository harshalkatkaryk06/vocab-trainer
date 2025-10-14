import express from 'express';
import { searchWords } from '../controllers/searchWords.js';

const router = express.Router();

router.post('/word', searchWords);  // POST /search_words/

export default router;
