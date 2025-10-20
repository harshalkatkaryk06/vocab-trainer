// searchWords.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// This will hold the last searched word and meaning
let lastSearched = { word: null, meaning: null };

export const searchWords = async (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "Word is required" });

  try {
    const prompt = `Provide the meaning of the word "${word}" in english, marathi, hindi also give its correct pronunciation...`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful dictionary assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const meaning = response.choices[0].message.content;

    // Store last searched word and meaning
    lastSearched = { word, meaning };
    console.log(lastSearched);
    
    res.json({ word, meaning });

  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
};

export const getLastSearched = () => lastSearched;
