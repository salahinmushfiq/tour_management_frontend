import React, { useState } from "react";
import { axiosInstance } from "../context/authAPI";
import { useAuth } from "../context/AuthContext";

export default function DeleteTourButton({ tourId, onDeleted }) {
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await axiosInstance.delete(`/tours/${tourId}/`);
      alert("Tour deleted successfully.");
      if (onDeleted) onDeleted(tourId); // Refresh list or redirect
    } catch (error) {
      console.error("Failed to delete tour:", error);
      alert("Failed to delete tour. Check permissions.");
    } finally {
      setDeleting(false);
    }
  };

  // Only Admin or Organizer can delete
  if (!user || !["admin", "organizer"].includes(user.role)) return null;

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
