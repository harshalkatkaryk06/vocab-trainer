import express from "express";
import Word from "../models/saveWord_Model.js";
import { getLastSearched } from "./searchWords.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { word, meaning } = getLastSearched();
  const { userid } = req.user; // Get userid from JWT token

  if (!word || !meaning || !userid) {
    return res.status(400).json({ error: "Missing required fields: word, meaning, or userid." });
  }

  try {
    const existingWord = await Word.findOne({ word, userid });
    if (existingWord) {
      return res.status(400).json({ message: "Word already exists in dictionary for this user." });
    }

    const savedWord = new Word({ word, meaning, userid });
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
