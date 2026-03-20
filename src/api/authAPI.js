//sr/api/authAPI.js
import axios from 'axios';
import api from './axiosInstance';
const API_BASE = import.meta.env.VITE_API_URL;

// 🔹 Unauthenticated endpoints
export const loginUser = (email, password) =>
  axios.post(`${API_BASE}/auth/jwt/create/`, { email, password });

export const refreshAccessToken = (refresh) =>
  axios.post(`${API_BASE}/auth/jwt/refresh/`, { refresh });

export const exchangeSocialToken = (provider, socialToken) =>
  axios.post(`${API_BASE}/accounts/social-token-exchange/`, {
    provider,
    social_token: socialToken,
  });

// 🔹 Authenticated endpoints
export const fetchUserProfile = () => api.get('/accounts/profile/');
export const fetchDashboardStats = () =>
  api.get('/tours/dashboard-stats/').then(res => res.data);
export const fetchTours = () => api.get('/tours/');


export default {
  loginUser,
  refreshAccessToken,
  exchangeSocialToken,
  fetchUserProfile,
  fetchDashboardStats,
  fetchTours,
};