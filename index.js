import 'dotenv/config';
import express from 'express';
import AI_Route from './routes/AI_Route.js';
import connectDB from './controllers/db.js';
import saveWord from './controllers/saveWordsController.js';
import UserRoutes from './routes/UserRoutes.js';
import { isAuth } from './middlewares/isAuth.js';


const app = express();
connectDB();



app.use(express.json());


app.use('/search_words',isAuth, AI_Route);
app.use('/dict',isAuth, saveWord);
app.use('/user',UserRoutes);



const PORT = process.env.PORT || 2000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});