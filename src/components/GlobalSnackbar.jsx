// src/components/GlobalSnackbar.jsx
import React from 'react';
import { Snackbar, Alert, useTheme } from "@mui/material";
import { useUIStore } from "../store/useUIStore";
const GlobalSnackbar = () => {

  const { snackbar, closeSnackbar } = useUIStore();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getSeverityColor = () => {
    switch (snackbar.severity) {
      case 'success': return '#10b981'; 
      case 'error': return '#ef4444';   
      case 'warning': return '#f59e0b'; 
      default: return '#3b82f6';      
    }
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.duration}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ mt: 7 }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        sx={{
          width: "100%",
          bgcolor: isDarkMode ? "rgb(30, 41, 59) !important" : "rgba(255, 255, 255, 0.8) !important",
          backdropFilter: "blur(12px)",
          color: isDarkMode ? "#f8fafc" : "rgb(15, 23, 42)",
          borderRadius: "16px",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
          borderLeft: `6px solid ${getSeverityColor()}`,
          boxShadow: isDarkMode ? "0 20px 25px -5px rgba(0,0,0,0.1)" : "0 10px 15px -3px rgba(0,0,0,0.1)",
          "& .MuiAlert-icon": { color: getSeverityColor() },
        }}
      >
        <span className="font-semibold">{snackbar.message}</span>
      </Alert>
    </Snackbar>
  );
}

export default GlobalSnackbar;