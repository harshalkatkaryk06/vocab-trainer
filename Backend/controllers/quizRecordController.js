
import express from "express";
import AnsweredQuiz from "../models/AnsweredQuiz.js";

const router = express.Router();

router.post("/save_quiz_record", async (req, res) => {
  const { score, total, questions } = req.body;
  const { userid } = req.user; 

  if (
    typeof score !== "number" ||
    typeof total !== "number" ||
    !Array.isArray(questions) ||
    !userid
  ) {
    return res.status(400).json({ error: "Invalid payload." });
  }

  try {
    const doc = new AnsweredQuiz({
      userId: userid,
      score,
      total,
      questions,
    });

    await doc.save();

    res.status(201).json({
      message: "Quiz record saved successfully",
      data: doc,
    });
  } catch (err) {
    console.error("Error saving quiz record:", err);
    res.status(500).json({ error: "Failed to save quiz record" });
  }
});

export default router;
