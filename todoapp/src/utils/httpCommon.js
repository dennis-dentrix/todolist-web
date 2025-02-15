import axios from "axios";

// const apiUrl = import.meta.env.API_URL;

const api = axios.create({
  baseURL: "https://todo-backend-nks4.onrender.com/api/v1",
  withCredentials: true,
});

// Function to get a cookie by name
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  
  }
  
  
  // Add a request interceptor to include the Authorization header
  api.interceptors.request.use(
  (config) => {
  const token = getCookie("jwt"); // Get the token from the cookie
  if (token) {
  config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  },
  (error) => {
  return Promise.reject(error);
  }
  );
  

export default api;