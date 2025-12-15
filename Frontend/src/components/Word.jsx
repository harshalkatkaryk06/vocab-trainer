import React from "react";
import "../styles/Word.css";

const Word = ({ result, loading, onSave }) => {
  if (loading) return <p>Loading...</p>;
  if (!result) return null;

  return (
    <div className="connection">
      <div className="results-content">

        <p><strong>Word:</strong> {result.word}</p>
        <p><strong>Primary Definition:</strong> {result.primaryDefinition}</p>
        <p><strong>Pronunciation:</strong> {result.pronunciation}</p>

        <h3>Example Sentences:</h3>
        <ul>
          {result.examples?.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>

        <div className="results-actions">
          <button className="save-btn" onClick={() => onSave(result)}>
            Save to Library
          </button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Word;
