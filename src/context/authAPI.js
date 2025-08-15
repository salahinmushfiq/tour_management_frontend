import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const API_BASE = import.meta.env.VITE_API_URL;

// 🔹 Login with email/password
export const loginUser = (email, password) =>
  axios.post(`${API_BASE}/auth/jwt/create/`, { email, password });

// 🔹 Refresh access token
export const refreshAccessToken = (refresh) =>
  axios.post(`${API_BASE}/auth/jwt/refresh/`, { refresh });

// 🔹 Exchange Google/Facebook token for JWT
export const exchangeSocialToken = (provider, token) =>
  axios.post(`${API_BASE}/accounts/social-token-exchange/`, {
    provider,
    social_token: token,
  });

// 🔹 Fetch profile (Authorization header is already set via axiosInstance in AuthContext)
export const fetchUserProfile = () => axiosInstance.get('/accounts/profile/');


export { axiosInstance };
