/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// AuthContext.js
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../httpCommon";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback to prevent unnecessary re-renders and avoid infinite loops
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/current"); // Endpoint to check current user
      console.log(response.data);
      if (response.status === 200) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setError(null); // Clear any previous errors
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError(
        err.response ? err.response.data.message : "Failed to authenticate"
      );
      //Clear Cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth(); // Call checkAuth on component mount
  }, [checkAuth]); // Only re-run if checkAuth changes

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      }); // Include credentials for cookie
      if (response.status === 200) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setError(null); // Clear any previous errors
        navigate("/");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError(err.response ? err.response.data.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, passwordConfirm) => {
    setLoading(true);
    try {
      const response = await api.post("/users/signup", {
        email,
        password,
        name,
        passwordConfirm,
      });

      if (response.status === 201) {
        // Assuming 201 is the success status code for signup
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setError(null); // Clear any previous errors
        navigate("/"); // Redirect to home page after signup
      } else {
        setError("Signup failed"); // Set generic error message
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError(
        err.response
          ? err.response.data.message
          : "Error creating account. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/users/logout");
      setUser(null);
      setIsAuthenticated(false);
      setError(null); // Clear any previous errors
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      setError(err.response ? err.response.data.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      await api.post("/users/forgotPassword", {
        email,
      });
      // Handle success (e.g., show a success message to the user)
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Error sending reset email. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        loginUser,
        logout,
        user,
        isAuthenticated,
        loading,
        error,
        forgotPassword,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
