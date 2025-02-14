/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth(); // Also check for loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      // Redirect only when not authenticated AND not still loading
      navigate("/login"); // Redirect to login page
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    // Optional: display a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
