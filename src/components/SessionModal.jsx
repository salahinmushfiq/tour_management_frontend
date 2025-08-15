import React from 'react';
import { useAuth } from '../context/AuthContext';

const SessionModal = () => {
  const { showExpiryWarning, setShowExpiryWarning, extendSession, logout } = useAuth();

  if (!showExpiryWarning) return null;

  /**
   * Called when user clicks "Extend"
   * - Refreshes the session tokens
   * - Hides the modal on success
   */
  const handleExtend = async (e) => {
    e.stopPropagation(); // Prevent modal click issues
    const newAccess = await extendSession();
    if (newAccess) {
      setShowExpiryWarning(false);
      console.log("✅ Session extended");
    } else {
      console.warn("⚠️ Session could not be extended");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-300 bg-opacity-60 dark:bg-gray-500 dark:bg-opacity-60 flex items-center justify-center z-50"
      onClick={() => setShowExpiryWarning(false)} // Click outside closes modal
    >
      <div
        className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inside click
      >
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Your session is about to expire
        </h2>
        <p className="mb-6 text-black dark:text-white">
          Would you like to extend your session?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => logout()}
            className="bg-red-600 text-white font-medium px-4 py-2 rounded"
          >
            Logout
          </button>
          <button
            onClick={handleExtend}
            className="bg-brand dark:bg-brand-dark text-white px-4 py-2 rounded"
          >
            Extend
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
