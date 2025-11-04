import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  saveTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  decodeToken,
  getTokenExpiryTime,
  formatTime,
} from './tokenService';

import {
  loginUser,
  refreshAccessToken,
  exchangeSocialToken,
  fetchUserProfile,
  axiosInstance,
} from './authAPI';

import useSessionTimer from './useSessionTimer';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // -------------------- 🔹 State Management --------------------
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [refreshToken, setRefreshToken] = useState(getRefreshToken());
  const [user, setUser] = useState(() => decodeToken(accessToken));
  const [sessionExpiry, setSessionExpiry] = useState(() =>
    accessToken ? getTokenExpiryTime(accessToken) : null
  );
  const [loading, setLoading] = useState(false);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);

  // Derived values for session countdown
  const timeLeft = sessionExpiry ? sessionExpiry - Date.now() : null;
  const countdown = formatTime(timeLeft);

  // -------------------- 🔹 Utility Functions --------------------

  /**
   * Redirects users to the correct dashboard based on their role.
   */
  const redirectToRoleDashboard = (role) => {
    if (role === 'tourist') navigate('/dashboard/tourist');
    else if (role === 'organizer') navigate('/dashboard/organizer');
    else if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'guide') navigate('/dashboard/guide');
    else navigate('/');
  };

  /**
   * Handles saving tokens to state + localStorage
   * Updates `accessToken`, `refreshToken`, and `user` state
   */
  const handleSaveTokens = (access, refresh) => {
    // console.log("🔑 Saving Tokens:", { access, refresh });
    saveTokens(access, refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(decodeToken(access));
    setSessionExpiry(getTokenExpiryTime(access));

    // Ensure Axios always uses the latest token
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  };

  // -------------------- 🔹 Authentication Methods --------------------

  /**
   * Login using email/password
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      handleSaveTokens(res.data.access, res.data.refresh);
      redirectToRoleDashboard(decodeToken(res.data.access)?.role);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Social login (Google/Facebook)
   * 1. Exchanges social token for JWT.
   * 2. Saves tokens and fetches optional profile.
   */
  const socialLogin = async (provider, socialToken) => {
    setLoading(true);
    try {
      const res = await exchangeSocialToken(provider, socialToken);
      handleSaveTokens(res.data.access, res.data.refresh);

      // Fetch full profile using the new access token
      // try {

      //   const profile = await fetchUserProfile();
      //   console.log("👤 Profile response:", profile.data);
      //   setUser(profile.data);
      // } catch (err) {
      //   console.error("❌ Profile fetch failed:", err.response?.status, err.response?.data);
      // }
      try {
        const profile = await fetchUserProfile();
        // console.log("👤 Profile response:", profile.data);
        setUser(profile.data);
      } catch (err) {
        console.error("❌ Profile fetch failed:", err);
        console.log("Full error object:", JSON.stringify(err, null, 2));
      }
      redirectToRoleDashboard(decodeToken(res.data.access)?.role);
    } catch (err) {
      console.error('Social login failed', err);
      alert('Social login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user, clear tokens, and redirect to login
   */
  const logout = () => {
    clearTokens();
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setSessionExpiry(null);
    navigate('/login');
  };

  /**
   * Refresh tokens (used for session extension and silent refresh)
   */
  const refreshTokens = useCallback(async () => {
    const currentRefreshToken = getRefreshToken(); // always read latest
    if (!currentRefreshToken) {
      console.warn("⚠️ No refresh token available");
      return;
    }

    try {
      const res = await refreshAccessToken(currentRefreshToken);
      const { access, refresh } = res.data;

      // Always update to new refresh token
      if (!refresh) {
        console.warn("⚠️ Backend did not send new refresh token");
      }

      // Save new tokens (with rotation if provided)
      handleSaveTokens(access, refresh || currentRefreshToken);

      return access;
    } catch (err) {
      console.error('Refresh token failed', err.response?.data || err.message);
      logout();
    }
  }, []); // no deps to avoid stale token issues

  // -------------------- 🔹 Axios Interceptor --------------------
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const original = err.config;

        // Attempt token refresh on 401
        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          const newToken = await refreshTokens();
          if (newToken) {
            original.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(original);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [refreshTokens]);

  // -------------------- 🔹 Session Timer --------------------
  useSessionTimer(accessToken, refreshToken, refreshTokens, logout, setShowExpiryWarning);

  // -------------------- 🔹 Sync Axios Auth Header --------------------
  useEffect(() => {
    if (accessToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  // -------------------- 🔹 Provide Context --------------------
  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        socialLogin,
        refreshTokens, // For programmatic refresh
        extendSession: refreshTokens, // For session modal
        loading,
        countdown,
        timeLeft,
        axiosInstance,
        showExpiryWarning,
        setShowExpiryWarning,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
