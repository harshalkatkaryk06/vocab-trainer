import 'dotenv/config';
import cors from "cors";
import express from 'express';

import AI_Route from './routes/AI_Route.js';
import connectDB from './controllers/db.js';
import saveWord from './controllers/saveWordsController.js';
import UserRoutes from './routes/UserRoutes.js';
import { isAuth } from './middlewares/isAuth.js';
import quizRecordRouter from "./controllers/quizRecordController.js";

const app = express();

connectDB();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://vocab-trainer-hw5d.vercel.app/"
  ],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vocab Trainer Backend is running 🚀");
});

app.use("/search_words", isAuth, quizRecordRouter);
app.use("/search_words", isAuth, AI_Route);
app.use("/dict", isAuth, saveWord);
app.use("/user", UserRoutes);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
