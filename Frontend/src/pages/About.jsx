import React from "react";
import Navbar from "../components/Navbar.jsx";

const About = () => {
  return (
    <div>
      <Navbar />

      <div
        style={{
          marginTop: "-100px",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            About This App
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#555",
            }}
          >
            <strong>Vocab Trainer App</strong> is a simple and effective application
            designed to help users improve their English vocabulary. It provides
            clear meanings, accurate pronunciations,
            and example sentences for real-world usage.
          </p>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#555",
              marginTop: "12px",
            }}
          >
            The app focuses on daily practice, avoids repetition, and is ideal for
            students and competitive exam aspirants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
