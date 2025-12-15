import React, { useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Word from "../components/Word.jsx";
import axios from "axios";

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search word
  const handleSearch = async (word) => {
    if (!word.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token"); // JWT stored after login

      const res = await axios.post(
        "http://localhost:5000/search_words/word",
        { word },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (error) {
      console.log("Error:", error);
      setResult({ word, primaryDefinition: "Error fetching data." });
    }

    setLoading(false);
  };

  // Save word to library
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT stored after login

      const res = await axios.post(
        "http://localhost:5000/dict",
        {}, // backend reads from getLastSearched()
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Word saved successfully!");
      console.log("Saved:", res.data);
    } catch (error) {
      console.error("Save error:", error);
      alert(error.response?.data?.message || "Failed to save word");
    }
  };

  return (
    <div className="home-main">
      <Navbar />
      <SearchInput onSearch={handleSearch} />
      <Word result={result} loading={loading} onSave={handleSave} />
    </div>
  );
};

export default Home;
