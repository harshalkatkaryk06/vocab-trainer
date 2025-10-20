import OpenAI from "openai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Word from "../models/saveWord_Model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
connectDB();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Exported variables holding aggregated results
export let correct_option;
export let correct_option_number;
export let incorrect_options;
export let numberedOptions;
export let quizzes = [];  // Store all generated quizzes here for checking

export const Gen_Quizes = async (req, res) => {
  try {
    const wordEntries = await Word.find();
    console.log(`Fetched ${wordEntries.length} words from DB.`);

    if (!wordEntries.length) {
      return res.status(404).json({ error: "No words in dictionary" });
    }

    const allQuizzes = [];

    for (const entry of wordEntries) {
      const { word, meaning: correctMeaning } = entry;
      console.log(`\nGenerating quiz for word: "${word}"`);
      console.log(`Correct meaning: "${correctMeaning}"`);

      const prompt = `Provide 3 plausible wrong meanings of the word "${word}". Return as a numbered list.`;
      console.log(`Prompt sent to OpenAI:\n${prompt}`);

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful dictionary assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      });

      const rawIncorrect = response.choices[0].message.content;
      console.log(`Raw incorrect meanings:\n${rawIncorrect}`);

      const incorrects = rawIncorrect
        .split("\n")
        .filter(Boolean)
        .map((line) => line.replace(/^\s*\d+[\).:]\s*/, "").trim());
      console.log(`Parsed incorrect meanings:\n${JSON.stringify(incorrects, null, 2)}`);

      const options = [...incorrects.slice(0, 3), correctMeaning];
      console.log(`Options before numbering:\n${JSON.stringify(options, null, 2)}`);

      const numbers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
      console.log(`Assigning random numbers: ${numbers}`);

      const numberedOptionsLocal = options.map((option, index) => ({
        number: numbers[index],
        option,
      }));
      console.log(`Numbered options:\n${JSON.stringify(numberedOptionsLocal, null, 2)}`);

      const correctOptionObj = numberedOptionsLocal.find(({ option }) => option === correctMeaning);
      console.log(`Correct option: "${correctOptionObj.option}" at number ${correctOptionObj.number}`);

      allQuizzes.push({
        word,
        correct_option: correctOptionObj.option,
        correct_option_number: correctOptionObj.number,
        incorrect_options: numberedOptionsLocal.filter(({ option }) => option !== correctOptionObj.option),
        numberedOptions: numberedOptionsLocal,
      });
      console.log(`Quiz for "${word}" added.\n---------------------------\n`);
    }

    // Save last quiz info globally
    const lastQuiz = allQuizzes[allQuizzes.length - 1];
    correct_option = lastQuiz.correct_option;
    correct_option_number = lastQuiz.correct_option_number;
    incorrect_options = lastQuiz.incorrect_options;
    numberedOptions = lastQuiz.numberedOptions;

    quizzes = allQuizzes; // Export all quizzes for check quiz file

    console.log(`\nAll Quizzes Generated:\n${JSON.stringify(allQuizzes, null, 2)}`);

    res.json({ quizzes: allQuizzes });
  } catch (error) {
    console.error("Error during quiz generation:", error);
    res.status(500).json({ error: "Failed to generate quizzes" });
  }
};
