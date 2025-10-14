import 'dotenv/config';
import express from 'express';
import AI_Route from './routes/AI_Route.js';


const app = express();



app.use(express.json());
app.use('/search_words', AI_Route);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
