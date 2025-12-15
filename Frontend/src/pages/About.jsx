import React from "react";
import Navbar from "../components/Navbar.jsx";

const About = () => {
  return (
    <div>
      <Navbar /> {/* Navbar for About page */}
      <div style={{ marginTop: "120px", textAlign: "center" }}>
        <h1>About This App</h1>
        {/* Add about info */}
      </div>
    </div>
  );
};

export default About;