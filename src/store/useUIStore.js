// src/store/useUIStore.js
import { create } from "zustand";

export const useUIStore = create((set, get) => ({
  // Sidebar
  isSidebarCollapsed: JSON.parse(localStorage.getItem("sidebarCollapsed")) || false,

  toggleSidebar: () =>
    set((state) => {
      const newState = !state.isSidebarCollapsed;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
      return { isSidebarCollapsed: newState };
    }),

  // Theme
  theme: localStorage.getItem("theme") || "light",

  setTheme: (value) => {
    const current = get().theme;

    const newTheme =
      typeof value === "function" ? value(current) : value;

    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    set({ theme: newTheme });
  },

  // Snackbar
  snackbar: {
    open: false,
    message: "",
    severity: "info",
    duration: 4000,
  },

  showSnackbar: (message, severity = "info", duration = 4000) =>
    set({
      snackbar: {
        open: true,
        message,
        severity,
        duration,
      },
    }),

  closeSnackbar: () =>
    set((state) => ({
      snackbar: {
        ...state.snackbar,
        open: false,
      },
    })),
}));