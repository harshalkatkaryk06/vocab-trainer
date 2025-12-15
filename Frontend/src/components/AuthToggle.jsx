const AuthToggle = ({ setActive }) => {
  return (
    <div className="toggle-box">
      <div className="toggle-pannel toggle-left">
        <h1>Hello, Welcome!</h1>
        <br />
        <p>Don't have an account?</p>
        <button className="btn register-btn" onClick={() => setActive(true)}>
          Register
        </button>
      </div>

      <div className="toggle-pannel toggle-right">
        <h1>Welcome back</h1>
        <br />
        <p>Already have an account?</p>
        <button className="btn login-btn" onClick={() => setActive(false)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthToggle;