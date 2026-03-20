// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { saveTokens, clearTokens, getAccessToken, getRefreshToken, decodeToken } from './tokenService';
import { loginUser, refreshAccessToken, exchangeSocialToken, fetchUserProfile } from '../api/authAPI'; 
import api from '../api/axiosInstance'; 
import useSessionTimer from '../hooks/useSessionTimer';
import { useUIStore } from '../store/useUIStore'; 
const AuthContext = createContext(); 
export const useAuth = () => useContext(AuthContext); 
export const AuthProvider = ({ children }) => { 
  const navigate = useNavigate(); 
  const { showSnackbar } = useUIStore(); 
  const [accessToken, setAccessToken] = useState(getAccessToken()); 
  const [refreshToken, setRefreshToken] = useState(getRefreshToken()); 
  const [user, setUser] = useState(() => decodeToken(accessToken) || null);
  const [loading, setLoading] = useState(false); 
  const [showExpiryWarning, setShowExpiryWarning] = useState(false); 
  
  // Save tokens and update state 
  const handleSaveTokens = (access, refresh) => { 
    saveTokens(access, refresh); 
    setAccessToken(access); 
    setRefreshToken(refresh); 
    const decoded = decodeToken(access);
    setUser(decoded); 
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    return decoded;
  }; 
  const logout = useCallback(() => {
    clearTokens();
    setAccessToken(null); 
    setRefreshToken(null); 
    setUser(null); 
    setShowExpiryWarning(false); 
    delete api.defaults.headers.common["Authorization"];
    navigate("/login", { replace: true }); 
  }, [navigate]); 
  const refreshTokens = useCallback(async () => { 
    const currentRefresh = getRefreshToken(); 
    if (!currentRefresh) {
      logout();
      return null;
    }
    try { 
      const res = await refreshAccessToken(currentRefresh); 
      handleSaveTokens(res.data.access, res.data.refresh || currentRefresh); 
      return res.data.access; 
    } 
    catch { 
      logout(); 
      return null; 
    } 
  }, [logout]); 
  const login = async (email, password) => { 
    setLoading(true); 
    try { 
      const res = await loginUser(email, password);
      const decodedUser = handleSaveTokens(res.data.access, res.data.refresh);
      navigateToRole(decodedUser.role);
    }
    catch (err) { 
      showSnackbar( err?.response?.data?.message || "Login failed. Please try again.", "error" ); 
    } 
    finally { 
      setLoading(false); 
    } 
  }; 
  const socialLogin = async (provider, socialToken) => { 
    setLoading(true); 
    try { 
      const res = await exchangeSocialToken(provider, socialToken); 
      const decodedUser = handleSaveTokens(res.data.access, res.data.refresh); 
      try { 
        const profile = await fetchUserProfile(); 
        setUser(profile.data); 
      } 
      catch (profileErr) { 
        console.error(profileErr); 
        showSnackbar( "Logged in but failed to fetch profile. Some data may be missing.", "warning" ); 
      }
      navigateToRole(decodedUser.role);
      } 
    catch (err) { 
        console.error(err); 
        showSnackbar('Social login failed. Please try again.', 'error'); 
    } 
    finally { 
        setLoading(false); 
    } 
  }; 
  // Axios interceptor for auto-refresh 
  useEffect(() => { 
    const interceptor = api.interceptors.response.use( (res) => res, async (err) => { 
      const original = err.config || {}; 
      if (err.response?.status === 401 && !original._retry) {
        original._retry = true; 
        try { 
          const newToken = await refreshTokens(); 
          if (newToken) { 
            original.headers['Authorization'] = `Bearer ${newToken}`; 
            return api(original); 
          } 
        } 
        catch { 
          logout(); 
          return Promise.reject(err); 
        } 
      } 
      return Promise.reject(err); 
    });
    return () => api.interceptors.response.eject(interceptor); 
  }, [refreshTokens,logout]);

  // Sync axios header 
  useEffect(() => { 
    if (accessToken) api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}` 
    else delete api.defaults.headers.common['Authorization'];
    }, 
    [accessToken]); 
    // Session timer 
    const { countdown, extendSessionHandler } = useSessionTimer( accessToken, refreshToken, refreshTokens, logout, setShowExpiryWarning ); 
    const navigateToRole = (role) => { 
      switch (role) { 
        case 'tourist': navigate('/dashboard/tourist'); 
        break; 
        case 'organizer': navigate('/dashboard/organizer');
        break; 
        case 'admin': navigate('/dashboard/admin'); 
        break;
        case 'guide': navigate('/dashboard/guide');
        break; 
        default: navigate('/'); 
        break; 
      } 
    }; 
    return ( 
      <AuthContext.Provider value={{ 
        user, 
        setUser,
        accessToken, 
        refreshToken, 
        login, 
        logout, 
        socialLogin,
        extendSession: extendSessionHandler, 
        loading, 
        countdown, 
        showExpiryWarning, 
        setShowExpiryWarning, 
      }} > {children} 
      </AuthContext.Provider> 
    ); 
};