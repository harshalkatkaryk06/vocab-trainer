// QuizPage.jsx - ONE QUESTION AT A TIME + Save Record with FULL TEXT
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import "../styles/QuizPage.css";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/search_words/gen_quizes",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const q = res.data.quizzes || [];
      setQuizzes(q);
      setSelectedNumbers(new Array(q.length).fill(undefined));
      setCurrentQuestion(0);
      setShowResults(false);
      setResults(null);
    } catch {
      setError("Failed to fetch quizzes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleRadioClick = (optionNumber) => {
    const copy = [...selectedNumbers];
    copy[currentQuestion] = optionNumber;
    setSelectedNumbers(copy);
  };

  const handleNext = () => {
    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (selectedNumbers.some((n) => n === undefined)) {
      alert("Answer ALL questions first!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/search_words/check_quiz",
        { selectedNumbers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res.data);
      setShowResults(true);
    } catch {
      setError("Submit failed");
    }
  };

  const handleSaveRecord = async () => {
    if (!results) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      const quizRecord = {
        score: results.correctWords.length,
        total: quizzes.length,
        questions: quizzes.map((quiz, index) => ({
          word: quiz.word,
          correctOptionText: quiz.correct_option,
          selectedOptionText:
            quiz.numberedOptions.find(
              (opt) => opt.number === selectedNumbers[index]
            )?.option || "",
          correctOptionNumber: quiz.correct_option_number,
          selectedOptionNumber: selectedNumbers[index],
          correct: results.correctWords.includes(quiz.word),
        })),
      };

      await axios.post(
        "http://localhost:5000/search_words/save_quiz_record",
        quizRecord,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Quiz record saved successfully!");
    } catch {
      alert("Failed to save record");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 className="quiz-loading">Loading quiz...</h2>;
  }

  const currentQuiz = quizzes[currentQuestion];

  return (
    <div className="quiz-page">
      <Navbar />

      {error && <div className="quiz-error">{error}</div>}

      <div className="quiz-content">
        {!showResults && (
          <>
            <div className="quiz-progress">
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{
                    width: `${((currentQuestion + 1) / quizzes.length) * 100}%`,
                  }}
                />
              </div>
              <p>
                Question {currentQuestion + 1} of {quizzes.length}
              </p>
            </div>

            <div className="quiz-card">
              <h2 className="quiz-word">
                {currentQuiz.word.toUpperCase()}
              </h2>

              {currentQuiz.numberedOptions.map((option, index) => (
                <div
                  key={option.number}
                  className={`quiz-option ${
                    selectedNumbers[currentQuestion] === option.number
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleRadioClick(option.number)}
                >
                  <input
                    type="radio"
                    checked={
                      selectedNumbers[currentQuestion] === option.number
                    }
                    onChange={() => handleRadioClick(option.number)}
                  />
                  <strong>{index + 1}.</strong>
                  <span>{option.option}</span>
                </div>
              ))}
            </div>

            <div className="quiz-actions">
              <button
                className="quiz-btn next"
                onClick={handleNext}
                disabled={currentQuestion === quizzes.length - 1}
              >
                Next
              </button>

              <button
                className="quiz-btn submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>

      {showResults && results && (
        <div className="quiz-result-overlay">
          <div className="quiz-result-box">
            <button
              className="quiz-close"
              onClick={() => setShowResults(false)}
            >
              ✕
            </button>

            <h2>🎉 RESULTS</h2>
            <h1>
              {results.correctWords.length}/{quizzes.length}
            </h1>

            <button
              className="quiz-save"
              onClick={handleSaveRecord}
              disabled={saving}
            >
              {saving ? "Saving..." : "💾 Save Record"}
            </button>

            <button className="quiz-new" onClick={fetchQuizzes}>
              🔄 New Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
