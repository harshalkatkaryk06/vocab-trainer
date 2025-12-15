import { useState } from "react";
import "../styles/auth.css";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import AuthToggle from "../components/AuthToggle";


const AuthForm = () => {
  const [active, setActive] = useState(false); // toggle login/register

  return (
    <div className={active ? "container active" : "container"}>
      {/* Login Box */}
      <div className="form-box login">
        <LoginForm />
      </div>

      {/* Register Box */}
      <div className="form-box register">
        <RegisterForm />
      </div>

      {/* Toggle Box */}
      <AuthToggle setActive={setActive} />
    </div>
  );
};

export default AuthForm;
