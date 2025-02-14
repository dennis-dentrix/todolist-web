/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useReducer } from "react";
import { createContext } from "react";
import api from "../httpCommon";

const AuthContext = createContext();

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case "signup":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case "loading":
      return { ...state, loading: true, error: null };

    case "error":
      return { ...state, error: action.payload, loading: false };

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function loginUser(email, password) {
    dispatch({ type: "loading" }); // Set loading state

    try {
      const response = await api.post(
        "/users/login",
        { email, password },
        { withCredentials: true }
      ); // Include credentials for cookie
      // console.log(response.data);
      const { user } = response.data.data; // Adjust based on your API response structure

      dispatch({
        type: "login",
        payload: { user }, // Dispatch user data
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response ? error.response.data.message : "Login failed", // Handle error message
      });
    }
  }

  async function signup(name, email, password, passwordConfirm) {
    dispatch({ type: "loading" });
    try {
      const response = await api.post(
        "/users/signup",
        {
          email,
          password,
          name,
          passwordConfirm,
        },
        { withCredentials: true }
      );

      const { user } = response.data.data;
      dispatch({
        type: "signup",
        payload: { user },
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.message
          ? error.response.data.message
          : "Error creating account. Try again later. ",
      });
    }
  }

  async function forgotPassword(email) {
    dispatch({ type: "loading" });

    try {
      const response = await api.post("/users/forgotPassword", { email });
      console.log(response);

      dispatch({
        type: "error",
        dispatch: null,
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : "Error sending reset email. Try again later.",
      });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

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
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Auth context is used outside the provider");

  return context;
}

export { AuthProvider, useAuth };
