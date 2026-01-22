import { quizzes } from "./Gen_Quizes.js"; 

export const checkQuizAnswer = (req, res) => {
  const userSelections = req.body.selectedNumbers; 

  if (!Array.isArray(userSelections)) {
    return res.status(400).json({ error: "selectedNumbers must be an array" });
  }

  if (!quizzes || quizzes.length === 0) {
    return res.status(400).json({ error: "No quizzes generated yet" });
  }

  const results = {
    correctWords: [],
    incorrectWords: [],
  };

  userSelections.forEach((selectedNumber, index) => {
    const quiz = quizzes[index];
    if (!quiz) return;

    if (selectedNumber === quiz.correct_option_number) {
      results.correctWords.push(quiz.word);
    } else {
      results.incorrectWords.push(quiz.word);
    }
  });

  console.log("Quiz check results:", results);
  res.json(results);
};