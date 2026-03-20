// src/providers/AppProviders.jsx
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "../utils/queryClient";
import { AuthProvider } from "../context/AuthContext";
import {SessionModal, GlobalSnackbar, ThemeSync,AuthWatcher } from '../components';
export default function AppProviders({ children }) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeSync />
        <AuthProvider>
          <AuthWatcher>
            <GlobalSnackbar />
            <SessionModal />
            {children}
          </AuthWatcher>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}