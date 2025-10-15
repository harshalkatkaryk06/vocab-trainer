// Import the correct and incorrect options with assigned numbers
import { correct_option_number, incorrect_options } from './Gen_Quizes.js';

export const checkQuizAnswer = (req, res) => {
  // User's selected option number from request body
  const userSelection = Number(req.body.selectedNumber);

  if (userSelection === correct_option_number) {
    console.log("Correct option selected");
    res.json({ message: "Correct option selected" });
  } else if (incorrect_options.some(opt => opt.number === userSelection)) {
    console.log("Incorrect option selected");
    res.json({ message: "Incorrect option selected" });
  } else {
    console.log("Invalid option selected");
    res.status(400).json({ error: "Invalid option selected" });
  }
};
