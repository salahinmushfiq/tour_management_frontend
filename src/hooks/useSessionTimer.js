// // src/context/useSessionTimer.js
// import { useEffect, useRef } from 'react';
// import { getTokenExpiryTime } from '../context/tokenService';
// import { useUIStore } from '../store/useUIStore';

// const WARNING_THRESHOLD_MS = 2 * 60 * 1000; // 2 min

// const useSessionTimer = (accessToken, refreshToken, refreshTokens, logout, setShowExpiryWarning, setCountdown) => {
//   const gracePeriodRef = useRef(false);
//   const { showSnackbar} = useUIStore.getState();

//   useEffect(() => {
//     if (!accessToken || !refreshToken) return;

//     const interval = setInterval(() => {
//       const expiryTime = getTokenExpiryTime(accessToken);
//       const timeLeftMs = expiryTime - Date.now();
//       const timeLeftSec = Math.max(Math.ceil(timeLeftMs / 1000), 0);

//       if (setCountdown) setCountdown(timeLeftSec);

//       if (timeLeftMs <= WARNING_THRESHOLD_MS && timeLeftMs > 0 && !gracePeriodRef.current) {
//         setShowExpiryWarning(true);
//       }

//       if (timeLeftSec <= 0) {
//         clearInterval(interval);
//         setShowExpiryWarning(false);
//         logout();
//         showSnackbar('Session expired. Please log in again.', 'error');
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [accessToken, refreshToken, logout, setShowExpiryWarning, setCountdown]);

//   useEffect(() => {
//     const handleExtend = () => {
//       gracePeriodRef.current = true;
//       setTimeout(() => { gracePeriodRef.current = false; }, 5000);
//     };
//     window.addEventListener('session-extended', handleExtend);
//     return () => window.removeEventListener('session-extended', handleExtend);
//   }, []);
// };

// export default useSessionTimer;

// src/hooks/useSessionTimer.js
import { useEffect, useRef, useState } from 'react';
import { getTokenExpiryTime } from '../context/tokenService';
import { useUIStore } from '../store/useUIStore';

const WARNING_THRESHOLD_MS = 2 * 60 * 1000; // 2 min

const useSessionTimer = (accessToken, refreshToken, refreshTokens, logout, setShowExpiryWarning) => {
  const graceRef = useRef(false);
  const intervalRef = useRef(null);
  const { showSnackbar } = useUIStore();
  const [countdown, setCountdown] = useState(null);

  // Tick function to update countdown and show modal
  const tick = () => {
    if (!accessToken) return;
    const expiry = getTokenExpiryTime(accessToken);
    const timeLeftMs = expiry - Date.now();
    const timeLeftSec = Math.max(Math.ceil(timeLeftMs / 1000), 0);
    setCountdown(timeLeftSec);

    // Show warning modal
    if (timeLeftMs <= WARNING_THRESHOLD_MS && timeLeftMs > 0 && !graceRef.current) {
      setShowExpiryWarning(true);
    }

    // Expire session
    if (timeLeftSec <= 0) {
      clearInterval(intervalRef.current);
      setShowExpiryWarning(false);
      logout();
      showSnackbar('Session expired. Please log in again.', 'error');
    }
  };

  // Start interval
  useEffect(() => {
    if (!accessToken || !refreshToken) return;
    tick(); // immediate tick
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, [accessToken, refreshToken, logout, setShowExpiryWarning]);

  // Handle session extend event (grace period)
  useEffect(() => {
    const handleExtend = () => {
      graceRef.current = true;
      setShowExpiryWarning(false);
      showSnackbar('Session extended successfully.', 'success');
      setTimeout(() => { graceRef.current = false; }, 5000);
    };
    window.addEventListener('session-extended', handleExtend);
    return () => window.removeEventListener('session-extended', handleExtend);
  }, [setShowExpiryWarning, showSnackbar]);

  // Handler exposed to components
  const extendSessionHandler = async () => {
    try {
      const newAccess = await refreshTokens();
      if (newAccess) window.dispatchEvent(new Event('session-extended'));
    } catch {
      logout();
    }
  };

  return { countdown, extendSessionHandler };
};

export default useSessionTimer;