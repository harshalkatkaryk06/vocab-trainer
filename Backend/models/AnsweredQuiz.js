import mongoose from "mongoose";

const QuestionResultSchema = new mongoose.Schema({
  word: { type: String, required: true },
  correctOptionText: { type: String, required: true },
  selectedOptionText: { type: String, required: true },
  correctOptionNumber: { type: Number, required: true },
  selectedOptionNumber: { type: Number, required: true },
  correct: { type: Boolean, required: true },
});

const AnsweredQuizSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // from JWT
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    questions: { type: [QuestionResultSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AnsweredQuiz", AnsweredQuizSchema);
