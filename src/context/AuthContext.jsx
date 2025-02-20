/* eslint-disable react/prop-types */
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken"); // Get token from localStorage
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get("/users/current");
        if (response.status === 200) {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
          setError(null);
        } else {
          throw new Error("Failed to authenticate");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError(
        err.response ? err.response.data.message : "Failed to authenticate"
      );
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
        const token = response.data.token; //Get token from response

        localStorage.setItem("jwtToken", token); // Save token in localStorage
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set token in headers

        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setError(null);
        showSnackbar("Login successful!");
        navigate("/");
      } else {
        setError("Login failed");
        showSnackbar("Login failed. Please try again.");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError("The email or password is incorrect");
      console.log(err.response?.data?.message);
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
        const token = response.data.token; //Get token from response

        localStorage.setItem("jwtToken", token); // Save token in localStorage
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set token in headers

        setUser(response.data.data.user);
        setIsAuthenticated(true);
        showSnackbar("Signup successful!");
        navigate("/");
      } else {
        setError("Signup failed");
        // showSnackbar("Signup failed. Please try again.");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setError("Error creating account. Try again later.");
      console.log(err.response?.data?.message);
      // showSnackbar(
      //   err.response?.data?.message ||
      //     "Error creating account. Try again later."
      // );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("jwtToken");
      delete api.defaults.headers.common["Authorization"];
      //Clear Auth Headers
      await api.get("/users/logout");
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      navigate("/");
    } catch (err) {
      console.log(err.response);
      setError("Logout failed");
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
      setError(null);
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
      const response = await api.patch(`/users/resetPassword/:${token}`, {
        password,
        passwordConfirm,
      });

      if (response.status === 200) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setError(null);
        navigate("/login");
        return true;
      } else {
        setError("Password reset failed...");
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);

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

  const updatePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch("/users/updateMyPassword", {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: newPassword,
      });

      if (response.status === 200) {
        const token = response.data.token; //Get token from response

        localStorage.setItem("jwtToken", token); // Save token in localStorage
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set token in headers

        setUser(response.data.data.user);
        setError(null);
        return { success: true, message: "Password updated successfully" };
      } else {
        setError("Password update failed");
        return { success: false, message: "Password update failed" };
      }
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
      return {
        success: false,
        message: err.response?.data?.message || "Password update failed",
      };
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
        forgotPassword,
        resetPassword,
        updatePassword,
        user,
        isAuthenticated,
        loading,
        error,
        snackbarOpen,
        snackbarMessage,
        closeSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
