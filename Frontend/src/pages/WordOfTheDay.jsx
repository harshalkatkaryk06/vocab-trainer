import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/WordOfTheDay.css";
import axios from "axios";

const WordOfTheDay = () => {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingNewWord, setIsFetchingNewWord] = useState(false);

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  const fetchWordOfTheDay = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/user/word_of_the_day", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = response.data;
      setWordData(data);
      
      console.log("✅ Word of the Day fetched:", data.word, data);
      
      setLoading(false);
      setSaveStatus("");
    } catch (err) {
      console.error("❌ Frontend fetch error:", err);
      setError("Failed to load Word of the Day");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post("http://localhost:5000/user/save-words", {
        word: wordData.word,
        meaning: wordData.meaning,
        pronunciation: wordData.pronunciation,
        examples: wordData.examples
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("✅ Saved:", response.data);
      setSaveStatus("Saved to library! ✅");
      
      // ✅ 2 SECOND DELAY FOR TESTING
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      fetchWordOfTheDay();
      setIsSaving(false);
    } catch (err) {
      setSaveStatus("Save failed");
      setIsSaving(false);
    }
  };

  const handleNewWord = async () => {
    setIsFetchingNewWord(true);
    try {
      // ✅ 2 SECOND DELAY FOR TESTING
      // await new Promise(resolve => setTimeout(resolve, 2000));
      
      await fetchWordOfTheDay();
    } finally {
      setIsFetchingNewWord(false);
    }
  };

  if (loading) return <div className="wod-main">Loading Word of the Day...</div>;
  if (error) return <div className="wod-main">{error}</div>;

  return (
    <div className="wod-main">
      <Navbar />
      <h2>Word Of The Day</h2>
      <div className="main"> 
        <div className="result-content">
          <p><strong>Word:</strong> {wordData.word}</p>
          <p><strong>Pronunciation:</strong> {wordData.pronunciation}</p>
          <p><strong>Meaning:</strong> {wordData.meaning}</p>

          <h3>Example Sentences:</h3>
          <ul>
            {wordData.examples?.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </ul>

          {saveStatus && <p className="save-status">{saveStatus}</p>}

          <div className="results-actions">
            <button 
              className="save-btn" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving... ⏳" : "Save to Library"}
            </button>
            <button 
              className="cancel-btn" 
              onClick={handleNewWord}
              disabled={isFetchingNewWord}
            >
              {isFetchingNewWord ? "Loading New Word... ⏳" : "New Word"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordOfTheDay;
