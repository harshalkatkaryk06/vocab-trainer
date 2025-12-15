import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import SearchInput from "../components/SearchInput.jsx";
import "../styles/PersonalLibrary.css";
import axios from "axios";

const PersonalLibrary = () => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false); // for delete button
  const [error, setError] = useState("");

  // fetch words from backend
  const fetchWords = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await axios.get("http://localhost:5000/user/fetchWords", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWords(res.data.words || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch words.");
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  if (!selectedWord) return;

  setBusy(true);
  setError("");

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please login.");

    // 🔹 Add debugging logs here
    console.log("Sending delete request for:", selectedWord.word);
    console.log("Token:", token);

    const res = await axios.post(
      "http://localhost:5000/user/deleteWord",
      { word: selectedWord.word },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Delete response:", res.data);

    // Remove locally from state
    setWords(prev => prev.filter(w => w.word !== selectedWord.word));
    setSelectedWord(null);

  } catch (err) {
    console.error("Delete failed:", err);
    setError(err.response?.data?.message || err.message || "Delete failed.");
  } finally {
    setBusy(false);
  }
};





  useEffect(() => {
    fetchWords();
  }, []);

  if (loading) return <h2>Loading your words...</h2>;

  return (
    <div className="home-main">
      <Navbar />
      <SearchInput />

      {error && <div style={{ color: "red", padding: 10 }}>{error}</div>}

      <div className="myword">
        {words.length === 0 ? (
          <h3>No words saved yet.</h3>
        ) : (
          words.map((wordObj) => (
            <div
              key={wordObj._id}
              className="first"
              onClick={() => {
                setSelectedWord(wordObj);
                console.log("Selected word:", wordObj.word);
              }}
            >
              {wordObj.word}
            </div>
          ))
        )}
      </div>

      {selectedWord && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedWord.word}</h2>

            <div className="word-details">
              <strong>Meaning:</strong> {selectedWord.meaning}
              <br />

              {selectedWord.pronunciation && (
                <>
                  <strong>Pronunciation:</strong> {selectedWord.pronunciation}
                  <br />
                </>
              )}

              {selectedWord.examples?.length > 0 && (
                <>
                  <strong>Examples:</strong>
                  <ul>
                    {selectedWord.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="modal-buttons">
              <button
                className="close-btn"
                onClick={() => setSelectedWord(null)}
                disabled={busy}
              >
                Close
              </button>

              <button
                className="delete-btn"
                onClick={handleDelete}
                disabled={busy}
              >
                {busy ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalLibrary;
