import axios from "axios";

// const apiUrl = import.meta.env.API_URL;

const api = axios.create({
  baseURL: "https://todo-backend-nks4.onrender.com/api/v1",
});

export default api;