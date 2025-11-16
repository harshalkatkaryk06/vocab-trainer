import Word from '../models/saveWord_Model.js';

// Export a function to fetch words
export const fetchWord = async (req, res) => {
  try {
    // Get userid from JWT token (attached by isAuth middleware)
    const { userid } = req.user;

    // Find all words for the logged-in user
    const words = await Word.find({ userid });

    if (!words.length) {
      return res.status(404).json({ message: 'No words found for this user.' });
    }

    res.status(200).json({ words });
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ error: 'Failed to fetch words.' });
  }
};
