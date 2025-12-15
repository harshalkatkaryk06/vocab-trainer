import React from "react";
import { useNavigate } from "react-router-dom"; // ← import hook
import Navbar from "../components/Navbar.jsx";
import "../styles/UserDetails.css";

const UserDetails = () => {
  const navigate = useNavigate(); // hook for navigation

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/", { replace: true });
  };

  return (
    <div className="user-main">
      <Navbar />

      <div className="profile">
        <div className="data">

          {/* USER DETAILS SECTION */}
          <div className="info">
            <h2>UserName : Admin</h2>
            <h2>Name : Dnyanesh</h2>
            <h2>DateOfBirth : 26-10-2004</h2>
            <h2>Age : 21</h2>
            <h2>Gender : Male</h2>
            <h2>Country : India</h2>
          </div>

          {/* BUTTONS AT BOTTOM */}
          <div className="actions">
            <button className="edit-btn">Edit</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDetails;
