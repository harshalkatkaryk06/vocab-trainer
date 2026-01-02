import Word from '../models/saveWord_Model.js';


export const fetchWord = async (req, res) => {
  try {
    const { userid } = req.user;
    
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
