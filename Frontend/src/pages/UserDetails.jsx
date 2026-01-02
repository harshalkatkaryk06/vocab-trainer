// UserDetails.jsx - with Edit form
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import "../styles/UserDetails.css";

const UserDetails = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [savedWordsCount, setSavedWordsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", age: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/", { replace: true });
          return;
        }

        const res = await axios.get("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data.user);
        setSavedWordsCount(res.data.savedWordsCount);
        setForm({
          username: res.data.user.username || "",
          email: res.data.user.email || "",
          age: res.data.user.age || "",
        });
      } catch (err) {
        console.error("User fetch error:", err);
        setError("Failed to load profile");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/user/profile",
        {
          username: form.username,
          email: form.email,
          age: form.age,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update local state with new data from backend
      setUserData(res.data.user);
      setEditing(false);
      setError("");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err.response?.data?.error || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="user-main">
        <Navbar />
        <div style={{ textAlign: "center", padding: "50px" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="user-main">
      <Navbar />

      {error && (
        <div style={{ color: "red", padding: "20px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <div className="profile">
        <div className="data">
          {/* Display mode vs Edit mode */}
          {!editing ? (
            <>
              <div className="info">
                <h2>UserName: {userData?.username}</h2>
                <h2>Email: {userData?.email}</h2>
                <h2>Age: {userData?.age}</h2>
              </div>

              <div style={{ marginTop: "20px", color: "#666" }}>
                <h3>Saved Words: {savedWordsCount}</h3>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* EDIT FORM */}
              <div className="info">
                <h2>Edit Profile</h2>
                <div style={{ marginTop: "15px" }}>
                  <label>
                    Username:{" "}
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      style={{ padding: "8px", width: "100%", marginTop: "5px" }}
                    />
                  </label>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <label>
                    Email:{" "}
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      style={{ padding: "8px", width: "100%", marginTop: "5px" }}
                    />
                  </label>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <label>
                    Age:{" "}
                    <input
                      type="number"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      style={{ padding: "8px", width: "100%", marginTop: "5px" }}
                    />
                  </label>
                </div>
              </div>

              <div className="actions" style={{ marginTop: "25px" }}>
                <button
                  className="edit-btn"
                  onClick={handleSaveProfile}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  className="logout-btn"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      username: userData.username,
                      email: userData.email,
                      age: userData.age,
                    });
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
