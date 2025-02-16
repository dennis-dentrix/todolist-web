/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/httpCommon";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  // useCallback to prevent unnecessary re-renders and avoid infinite loops
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/current"); // Endpoint to check current user
      if (response.status === 200) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setError(null); // Clear any previous errors
      } else {
        throw new Error("Failed to authenticate");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError(
        err.response ? err.response.data.message : "Failed to authenticate"
      );
      // Clear Cookies
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
    checkAuth();
  }, [checkAuth]);

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setError(null);
        showSnackbar("Login successful!"); // Show success snackbar
        navigate("/");
      } else {
        setError("Login failed");
        showSnackbar("Login failed. Please try again."); //Show failure snackbar
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      if (err.response && err.response.status === 401) {
        showSnackbar("Incorrect email or password. Please try again."); // Specific message for invalid credentials
      } else {
        showSnackbar(
          "Login failed. Please check your credentials and try again."
        );
      }
      // setError(err.response ? err.response.data.message : "Login failed"); // Removed setError since snackbar is used
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, passwordConfirm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/users/signup", {
        email,
        password,
        name,
        passwordConfirm,
      });

      if (response.status === 201) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        showSnackbar("Signup successful!"); // Show success snackbar
        navigate("/");
      } else {
        setError("Signup failed");
        showSnackbar("Signup failed. Please try again."); //Show failure snackbar
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.message.includes("already registered")
      ) {
        showSnackbar(
          "An account with this email already exists. Please log in."
        ); // Specific message for existing account
        navigate("/login");
      } else {
        showSnackbar("Error creating account. Try again later.");
      }
      // setError( //Removed setError since snackbar is used
      // err.response ? err.response.data.message : "Error creating account. Try again later."
      // );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.get("/users/logout");
      // console.log("Logout Response:", response);

      setUser(null);
      setIsAuthenticated(false);
      setError(null); // Clear any previous errors
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      // console.error("Logout Error:", err.message);
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

  const resetPassword = async (token, password, passwordConfirm) => {
    setLoading(true);
    try {
      const response = await api.patch(`/users/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });

      if (response.status === 200) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setError(null);
        navigate("/");
      } else {
        setError("Password reset failed");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);

      // Check if the error is due to an expired token
      if (err.response && err.response.status === 400) {
        setError("Token has expired. Please request a new password reset.");
      } else {
        setError(
          err.response ? err.response.data.message : "Password reset failed"
        );
      }
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
        resetPassword,
        snackbarOpen,
        snackbarMessage,
        closeSnackbar,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};
