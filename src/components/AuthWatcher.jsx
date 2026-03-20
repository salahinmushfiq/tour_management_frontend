//src/components/authWatcher.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export default function AuthWatcher({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Only redirect if the path starts with /dashboard
  const isProtectedPath = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    if (isProtectedPath && !user) {
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  }, [user, navigate, queryClient, isProtectedPath]);

  return children;
}