// utils/muiTheme.js
import { createTheme } from '@mui/material/styles';

export const getMuiTheme = (mode) => {
  return createTheme({
    palette: {
      mode, // 'light' or 'dark'
      ...(mode === 'dark'
        ? {
            background: {
              default: '#0f172a', // Tailwind slate-900
              paper: '#1e293b',   // Tailwind slate-800
            },
            text: {
              primary: '#e5e7eb',
              secondary: '#cbd5e1',
            },
          }
        : {
            background: {
              default: '#ffffff',
              paper: '#f8fafc',
            },
            text: {
              primary: '#1f2937',
              secondary: '#4b5563',
            },
          }),
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            fontFamily: 'inherit',
          },
        },
      },
    },
  });
};
