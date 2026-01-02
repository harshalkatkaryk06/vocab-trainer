import React, { useState } from "react";
import axios from "axios";

const ForgetPasswordForm = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("http://localhost:5000/user/forget-password", {
        username,
        newPassword,
      });

      setMessage("Password updated successfully! You can now login.");
      setUsername("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrapper">
      <h2 className="fp-title">Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="fp-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="fp-group">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button className="fp-submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {message && <p className="fp-success">{message}</p>}
      {error && <p className="fp-error">{error}</p>}
    </div>
  );
};

export default ForgetPasswordForm;
