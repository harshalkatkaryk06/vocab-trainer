import Word from '../models/Word.js';

export const deleteWord = async (req, res) => {
  try {
    const userId = req.user.userid;
    const { word } = req.body;

    if (!word) return res.status(400).json({ message: "Word is required" });

    // find the document
    const wordDoc = await Word.findOne({ userid: userId, word });
    console.log("Found word document:", wordDoc);

    if (!wordDoc) return res.status(404).json({ message: "Word not found" });

    // delete it
    await Word.deleteOne({ _id: wordDoc._id });
    console.log("Word deleted successfully");

    return res.json({ message: "Word deleted successfully" });

  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ message: "Server error while deleting word" });
  }
};
