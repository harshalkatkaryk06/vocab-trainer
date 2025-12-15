import React from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/WordOfTheDay.css";

const WordOfTheDay = () => {
  return (
    <div className="wod-main">
      <Navbar /> {/* Navbar for Word of the Day page */}
      <h2>Word Of The Day</h2>
      <div className="main"> 
        <div className="result-content">
          <p><strong>Word:</strong> </p>
          <p><strong>Pronunciation:</strong> </p>
          <p><strong>Part of Speech:</strong> </p>
          <p><strong>Primary Definition:</strong> </p>
          <p><strong>Additional Definition:</strong> </p>
          <p><strong>Synonyms:</strong> </p>
          <p><strong>Antonyms:</strong> </p>

          <h3>Example Sentences:</h3>
          <ul>
            <li>Example: </li>
            <li>Example: </li>
          </ul>

          <p><strong>Relatable Words:</strong> </p>

          <div className="results-actions">
            <button className="save-btn">Save to Library</button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordOfTheDay;