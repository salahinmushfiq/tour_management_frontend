import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
  User,
  Settings,
  ChevronDown,
  LayoutDashboardIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const ProfileDropdown = ({ variant = "organizer" }) => {
  const { user, logout, countdown } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const isTourist = variant === "tourist";

  const profilePath = `/dashboard/${user?.role || "tourist"}/profile`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleDashboardClick = () => {
    if (user?.role === "organizer") navigate("/dashboard/organizer");
    else if (user?.role === "admin") navigate("/dashboard/admin");
    else if (user?.role === "guide") navigate("/dashboard/guide");
    else navigate("/dashboard/tourist");
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isTourist
            ? "border-2 border-primary bg-white/10 text-gray-700 shadow-md p-1 border-gray-900  dark:border-white" 
            : "bg-gray-200 text-gray-800 p-2 dark:bg-gray-700 dark:text-white "
        }`}
      >
        <User className={isTourist ? "w-6 h-6" : "w-5 h-5"} />

        <span className={`hidden sm:inline ${isTourist ? "" : "font-semibold"}`}>
          {user?.name || user?.email || "User"}
        </span>

        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
          absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50
          bg-white text-gray-800
          dark:bg-gray-900 dark:text-gray-200
          border border-gray-200 dark:border-gray-700
        "
        >
          {/* Header */}
          <div
            className="
            px-4 py-3 text-sm font-medium truncate
            border-b border-gray-200
            dark:border-gray-700
          "
          >
            {user?.email || "User"}
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate(profilePath)}
            className="
            flex items-center gap-2 w-full px-4 py-2 text-sm
            hover:bg-gray-100
            dark:hover:bg-gray-800
          "
          >
            <User className="w-4 h-4" />
            Profile
          </button>

          {/* Dashboard */}
          <button
            onClick={handleDashboardClick}
            className="
            flex items-center gap-2 w-full px-4 py-2 text-sm
            hover:bg-gray-100
            dark:hover:bg-gray-800
          "
          >
            <LayoutDashboardIcon className="w-4 h-4" />
            Dashboard
          </button>

          {/* Session Countdown */}
          {countdown !== null && countdown >= 0 && (
            <div
              className="
              px-4 py-2 text-xs
              text-gray-500
              dark:text-gray-400
              border-t border-gray-200
              dark:border-gray-700
            "
            >
              ⏳ Session: {Math.floor(countdown / 60)}:
              {String(countdown % 60).padStart(2, "0")} minutes
            </div>
          )}

          {/* Settings */}
          {/* <button
            onClick={() => alert("Settings clicked")}
            className="
            flex items-center gap-2 w-full px-4 py-2 text-sm
            hover:bg-gray-100
            dark:hover:bg-gray-800
          "
          >
            <Settings className="w-4 h-4" />
            Settings
          </button> */}

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700" />

          {/* Logout */}
          <button
            onClick={logout}
            className="
            flex items-center gap-2 w-full px-4 py-2 text-sm
            text-red-600
            hover:bg-red-100
            dark:hover:bg-red-800
          "
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;