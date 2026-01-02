import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Store the last searched word
let lastSearched = {
  word: null,
  primaryDefinition: null,
  pronunciation: null,
  pronunciationReadable: null,
  examples: []
};

export const searchWords = async (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "Word is required" });

  try {
    const prompt = `
You are a professional English dictionary assistant.

For the word "${word}", return ONLY valid JSON in the exact format below.
Do NOT include markdown, explanations, or extra text.

Rules for pronunciation:
- "pronunciation" MUST be IPA phonetic symbols (example: ˈvoʊ.kæb)
- "pronunciationReadable" MUST be written in simple English letters
- Use hyphens between syllables
- DO NOT use IPA symbols (ˈ æ ʊ ɔ ə etc.) in pronunciationReadable
- pronunciationReadable should be easy for beginners to read

Example:
{
  "primaryDefinition": "short for vocabulary",
  "pronunciation": "ˈvoʊ.kæb",
  "pronunciationReadable": "VOH-kab",
  "examples": [
    "I am learning new vocab every day.",
    "This app helps improve your vocab."
  ]
}

Now generate the response for the given word.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a professional English dictionary assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    });

    const rawContent = response.choices[0].message.content.trim();

    let data;
    try {
      data = JSON.parse(rawContent);
    } catch (err) {
      console.error("❌ Failed to parse JSON from OpenAI:", rawContent);
      return res.status(500).json({ error: "Failed to parse response from AI" });
    } 

    lastSearched = { word, ...data };
    console.log("✅ Word fetched:", lastSearched);

    res.json({ word, ...data });
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
};

export const getLastSearched = () => lastSearched;
