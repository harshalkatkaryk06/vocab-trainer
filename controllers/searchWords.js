import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const searchWords = async (req, res) => {
  const { word } = req.body;


  if (!word) {
    return res.status(400).json({ error: "Word is required" });
  }


  try {
    const prompt = `Provide the meaning of the word "${word}" and use it in a sentence. Format the response clearly with meaning and example sentence.`;


    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful dictionary assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });


    const result = response.choices[0].message.content;


    res.json({ result });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
};