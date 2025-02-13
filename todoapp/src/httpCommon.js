import axios from "axios";

const apiUrl = import.meta.env.API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export default axiosInstance;