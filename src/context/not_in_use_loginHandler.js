// loginHandler.js (or inside AuthContext)

import jwtDecode from "jwt-decode";
import { setAuthState } from "./AuthContext"; // if using context
import { useNavigate } from "react-router-dom";

export const handleLoginSuccess = (access, refresh, navigate) => {
  // Store tokens
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  const decoded = jwtDecode(access);
  const role = decoded.role;
  const loginMethod = decoded.login_method;

  setAuthState({
    user: {
      id: decoded.id,
      email: decoded.email,
      role,
      loginMethod,
    },
    accessToken: access,
    refreshToken: refresh,
  });

  // 🔁 Redirect based on role
  if (role === "tourist") {
    navigate("/dashboard/tourist");
  } else if (role === "organizer") {
    navigate("/dashboard/organizer");
  } else {
    navigate("/dashboard");
  }
};
