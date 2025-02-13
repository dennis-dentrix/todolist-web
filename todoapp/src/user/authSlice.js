import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the auth slice
const initialState = {
  loading: false,
  userInfo: null,
  token: null,
  error: null,
  isAuthenticated: false,
};

// Async thunk for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.API_URL}/auth/status`, {
        withCredentials: true, // Allow sending cookies with requests
      });
      return response.data; // Return user data if authenticated
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.API_URL}/auth/login`, { email, password }, {
        withCredentials: true, // Allow sending cookies with requests
      });
      return response.data; // Return user data and token
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for signing up
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.API_URL}/auth/signup`, { name, email, password }, {
        withCredentials: true, // Allow sending cookies with requests
      });
      return response.data; // Return user data and token
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearError(state) {
      state.error = null; // Clear error message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user; // Set user info from payload
        state.token = action.payload.token; // Set token from payload
        state.isAuthenticated = true; // User is authenticated
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message from payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user; // Set user info from payload
        state.token = action.payload.token; // Set token from payload
        state.isAuthenticated = true; // User is authenticated
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message from payload
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user; // Set user info from payload
        state.token = action.payload.token; // Set token from payload
        state.isAuthenticated = true; // User is authenticated
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message from payload
      });
  },
});

// Export actions and reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
