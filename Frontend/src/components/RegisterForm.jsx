import InputField from "./InputField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [age, setAge] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !pass || !confirm || !age) {
      setErrorMsg("All fields are required.");
      setSuccessMsg("");
      return;
    }
    if (pass !== confirm) {
      setErrorMsg("Passwords do not match.");
      setSuccessMsg("");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/user", {
        username,
        email,
        password: pass,
        age,
      });

      setSuccessMsg(res.data.message);
      setErrorMsg("");

      // Redirect to login after short delay
      setTimeout(() => navigate("/", { replace: true }), 1500);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
      setSuccessMsg("");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={setUsername}
        icon="bxs-user"
      />

      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
        icon="bxs-envelope"
      />

      <InputField
        type="number"
        placeholder="Age"
        value={age}
        onChange={setAge}
        icon="bxs-user"
      />

      <InputField
        type="password"
        placeholder="Password"
        value={pass}
        onChange={setPass}
        icon="bxs-lock-alt"
      />

      <InputField
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={setConfirm}
        icon="bxs-lock-alt"
      />

      <button type="submit" className="btn">Register</button>
    </form>
  );
};

export default RegisterForm;
