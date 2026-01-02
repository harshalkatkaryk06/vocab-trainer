import express from "express";
import Word from "../models/saveWord_Model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { word, meaning, pronunciation, examples } = req.body;
  const { userid } = req.user; 

  const finalMeaning = meaning || req.body.primaryDefinition;

  if (!word || !finalMeaning || !userid) {
    return res.status(400).json({ 
      error: "Missing required fields: word, meaning/primaryDefinition, or userid." 
    });
  }

  try {
    const existingWord = await Word.findOne({ word, userid });
    if (existingWord) {
      return res.status(400).json({ 
        message: "Word already exists in your dictionary!" 
      });
    }

    const savedWord = new Word({
      word,
      meaning: finalMeaning, 
      pronunciation: pronunciation || "",
      examples: examples || [],
      userid
    });

    await savedWord.save();

    res.status(201).json({
      message: "Word saved successfully to your library!",
      data: savedWord,
    });
  } catch (error) {
    console.error("Error saving word:", error);
    res.status(500).json({ error: "Failed to save word" });
  }
});

export default router;
