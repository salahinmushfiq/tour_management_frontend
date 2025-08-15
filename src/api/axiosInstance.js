// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // unless you want to send cookies
  headers: {
    'Content-Type': 'application/json',
    // Authorization header will be dynamically set in AuthContext
  },
});

export default axiosInstance;