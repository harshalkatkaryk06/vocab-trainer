import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        username,
        password,
      });

      console.log("Response:", res.data);

      if (res.data.token) {
        // Save token in localStorage
        localStorage.setItem("token", res.data.token);

        // Redirect to /home after login
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(val) => setUsername(val)}
        icon="bxs-user"
      />

      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(val) => setPassword(val)}
        icon="bxs-lock-alt"
      />

     
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
