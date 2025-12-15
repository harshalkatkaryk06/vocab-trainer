import React, { useState } from "react";
import "../styles/SearchInput.css";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="home-container">
      <input
        type="text"
        className="home-input"
        placeholder="Search a word..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="search-btn"
        onClick={() => onSearch(searchTerm)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
