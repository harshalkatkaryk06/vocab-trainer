import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  // Logged in → render the requested page
  return children;
};

export default ProtectedRoute;
