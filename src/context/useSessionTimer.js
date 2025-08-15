import { useEffect } from 'react';
import { getTokenExpiryTime, clearTokens } from './tokenService';
import { toast } from 'react-hot-toast';

const useSessionTimer = (
  accessToken,
  refreshToken,
  refreshTokens,
  logout,
  setShowExpiryWarning
) => {
  useEffect(() => {
    let interval;

    if (accessToken && refreshToken) {
      interval = setInterval(() => {
        const expiryTime = getTokenExpiryTime(accessToken);
        const timeLeft = expiryTime - Date.now();

        // Show modal if less than 2 minutes left
        if (timeLeft <= 2 * 60 * 1000 && timeLeft > 0) {
          setShowExpiryWarning(true);
        }

        // If token expired
        if (timeLeft <= 0) {
          clearInterval(interval);
          clearTokens();
          logout();
          toast.error("Session expired. Please log in again.");
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [accessToken, refreshToken, refreshTokens, logout, setShowExpiryWarning]);
};

export default useSessionTimer;
