import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import PersonalLibrary from "./pages/PersonalLibrary";
import QuizPage from "./pages/QuizPage"; 
import WordOfTheDay from "./pages/WordOfTheDay";
import VocabularyTest from "./pages/VocabularyTest";
import About from "./pages/About";
import UserDetails from "./pages/UserDetails";
import AuthForm from "./pages/AuthForm";
import ProtectedRoute from "./services/ProtectedRoute";

import '../src/App.css';

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route
          path="/"
          element={token ? <Navigate to="/home" replace /> : <AuthForm />}
        />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <VocabularyTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/word-of-the-day"
          element={
            <ProtectedRoute>
              <WordOfTheDay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <PersonalLibrary />
            </ProtectedRoute>
          }
        />
        {/* ✅ NEW QUIZ ROUTE */}
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
