import 'dotenv/config';
import express from 'express';
import AI_Route from './routes/AI_Route.js';
import connectDB from './controllers/db.js';
import saveWord from './controllers/saveWordsController.js';


const app = express();
connectDB();


app.use(express.json());
app.use('/search_words', AI_Route);
app.use('/dict',saveWord);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
