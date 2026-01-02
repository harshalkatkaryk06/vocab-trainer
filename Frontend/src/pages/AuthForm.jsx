import { useState } from "react";
import "../styles/auth.css";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgetPasswordForm from "../pages/ForgetPasswordForm";
import AuthToggle from "../components/AuthToggle";

const AuthForm = () => {
  const [active, setActive] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false); // popup toggle

  return (
    <>
      <div className={active ? "container active" : "container"}>
        {/* Login Box */}
        <div className="form-box login">
          <LoginForm />
          {/* ✅ FORGOT PASSWORD LINK - DIRECTLY HERE */}
          <div className="forgot-link" style={{ 
            padding: '0 30px 20px', 
            textAlign: 'center',
            borderTop: '1px solid #eee',
            marginTop: '10px',
            paddingTop: '15px'
          }}>
            <span
  onClick={() => setShowForgetPassword(true)}
  style={{ 
    color: '#333',         // Normal text color
    textDecoration: 'none', 
    fontSize: '14px', 
    cursor: 'pointer'      // Still clickable
  }}
>
  Forgot password
</span>

          </div>
        </div>

        {/* Register Box */}
        <div className="form-box register">
          <RegisterForm />
        </div>

        {/* Toggle Box */}
        <AuthToggle setActive={setActive} />
      </div>

      {/* ✅ POPUP MODAL */}
      {showForgetPassword && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 1000, padding: '20px'
          }}
          onClick={() => setShowForgetPassword(false)}
        >
          <div 
            style={{
              background: 'white', borderRadius: '20px', padding: '40px',
              maxWidth: '400px', width: '90%', position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowForgetPassword(false)}
              style={{
                position: 'absolute', top: '15px', right: '20px',
                background: 'none', border: 'none', fontSize: '24px',
                color: '#999', cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <ForgetPasswordForm />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthForm;
