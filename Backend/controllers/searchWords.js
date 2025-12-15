import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Store the last searched word
let lastSearched = { word: null, primaryDefinition: null, pronunciation: null, pronunciationReadable: null, examples: [] };

export const searchWords = async (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "Word is required" });

  try {
    const prompt = `
You are a helpful dictionary assistant.

Provide the following details for the word "${word}":
1. Primary Definition (concise English)
2. Pronunciation in phonetic format
3. Readable Pronunciation (normal English letters)
4. Two example sentences using the word

Format your response exactly as JSON:
{
  "primaryDefinition": "...",
  "pronunciation": "...",
  "pronunciationReadable": "...",
  "examples": ["Example sentence 1", "Example sentence 2"]
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful dictionary assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const rawContent = response.choices[0].message.content.trim();
    let data;
    try {
      data = JSON.parse(rawContent);
    } catch (err) {
      console.error("Failed to parse JSON from OpenAI:", rawContent);
      return res.status(500).json({ error: "Failed to parse response from AI" });
    }

    lastSearched = { word, ...data };
    console.log(lastSearched);

    res.json({ word, ...data });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
};

export const getLastSearched = () => lastSearched;
