import jwtDecode from 'jwt-decode';

export const saveTokens = (access, refresh) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
};

export const clearTokens = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

export const getAccessToken = () => localStorage.getItem('access');
export const getRefreshToken = () => localStorage.getItem('refresh');

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const getTokenExpiryTime = (token) => {
  try {
    return jwtDecode(token).exp * 1000;
  } catch {
    return null;
  }
};

export const formatTime = (ms) => {
  if (!ms || ms < 0) return null;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
