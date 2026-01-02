import OpenAI from "openai";
import User from "../models/user.js";
// ✅ REMOVED conflicting Word import

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const wordOfTheDay = async (req, res) => {
  try {
    const userId = req.user.userid;
    const user = await User.findOne({ userid: userId }).select("age");
    
    if (!user || !user.age) {
      return res.status(400).json({ error: "User age not found" });
    }

    const prompt = `Generate a Word of the Day for ${user.age} year old user. Respond with ONLY valid JSON:
    {
      "word": "",
      "meaning": "",
      "pronunciation": "",
      "examples": ["", ""]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Respond with ONLY valid JSON, no extra text." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    // ✅ Just return data - let Save button handle saving
    res.json({
      success: true,
      word: result.word,
      meaning: result.meaning,
      pronunciation: result.pronunciation,
      examples: result.examples,
      userid: userId,
      userAge: user.age
    });

  } catch (error) {
    console.error("Word of the Day error:", error);
    res.status(500).json({ error: "Failed to generate Word of the Day" });
  }
};
