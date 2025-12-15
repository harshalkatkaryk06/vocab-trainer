const SwitchTab = ({ isLogin, setIsLogin }) => {
  return (
    <div className="text-center mt-6">
      {!isLogin ? (
        <button
          className="text-blue-600 font-semibold"
          onClick={() => setIsLogin(true)}
        >
          Already have an account? Login
        </button>
      ) : (
        <button
          className="text-blue-600 font-semibold"
          onClick={() => setIsLogin(false)}
        >
          Don't have an account? Register
        </button>
      )}
    </div>
  );
};

export default SwitchTab;