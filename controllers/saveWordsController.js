import express from "express";
import Word from "../models/saveWord_Model.js";
import { getLastSearched } from "./searchWords.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { word, meaning } = getLastSearched();

  if (!word || !meaning) {
    return res.status(400).json({ error: "No recent searched word to save" });
  }

  try {
    const existingWord = await Word.findOne({ word });
    if (existingWord) {
      return res.status(400).json({ message: "Word already exists in dictionary" });
    }

    const savedWord = new Word({ word, meaning });
    await savedWord.save();

    res.status(201).json({
      message: "Word saved successfully",
      data: savedWord,
    });

  } catch (error) {
    console.error("Error saving word:", error);
    res.status(500).json({ error: "Failed to save word" });
  }
});

export default router;
