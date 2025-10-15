import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export let correct_option;
export let correct_option_number;
export let incorrect_options;
export let numberedOptions;

export const Gen_Quizes = async (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ error: "Word is required" });
  }

  try {
    const prompt = `Provide 3 wrong meanings of the word "${word}" and one correct meaning for a quiz, as a numbered list. Always put the correct meaning as option 4.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful dictionary assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    // Raw result text from GPT
    const result = response.choices[0].message.content;

    // Split by line and clean, removing numbering (1., 2:, etc.)
    const options = result.split('\n').filter(Boolean).map(line => {
      return line.replace(/^\s*\d+[\).:]\s*/, '').trim();
    });

    // Shuffle numbers 1-4 to assign unique random numbers
    const numbers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);

    // Map options to numbers
    numberedOptions = options.map((option, index) => ({
      number: numbers[index],
      option,
    }));

    // Find which option is the correct one (4th in original options)
    const correctOptionObj = numberedOptions.find(({ option }) => option === options[3]);

    // Set exported variables
    correct_option = correctOptionObj.option;
    correct_option_number = correctOptionObj.number;
    incorrect_options = numberedOptions.filter(({ option }) => option !== correct_option);

    // Log options with numbers
    numberedOptions.forEach(({ number, option }) => {
      console.log(`Option ${number}: ${option}`);
    });

    console.log("Correct option number:", correct_option_number);

    // Respond with structured data for client
    res.json({
      correct_option,
      correct_option_number,
      incorrect_options,
      numberedOptions,
    });

  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
};
