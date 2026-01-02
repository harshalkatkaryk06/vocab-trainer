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

      // Only keep human-readable pronunciation
      setResult({
        word: res.data.word,
        primaryDefinition: res.data.primaryDefinition,
        pronunciation: res.data.pronunciationReadable, // ✅ human-readable only
        examples: res.data.examples || [],
      });
    } catch (error) {
      console.log("Error:", error);
      setResult({ word, primaryDefinition: "Error fetching data.", pronunciation: "" });
    }

    setLoading(false);
  };

  // Save word to library
  const handleSave = async () => {
    if (!result?.word) {
      return alert("Search a word first!");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/dict",
        {
          word: result.word,
          meaning: result.primaryDefinition || "",
          pronunciation: result.pronunciation || "", // ✅ human-readable only
          examples: result.examples || []
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      console.log("Saved:", res.data);
    } catch (error) {
      console.error("Save error:", error.response?.data);
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
