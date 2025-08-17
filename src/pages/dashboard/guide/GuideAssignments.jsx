import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Skeleton } from "@mui/material";

export default function GuideAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondingId, setRespondingId] = useState(null); // For loading state on respond action

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await axiosInstance.get(`tours/tour-guide-assignments`);
        setAssignments(res.data);
        console.log("Assignments");
        console.log(res);
        console.log(res.data);
      } catch (err) {
        setError("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    }
    fetchAssignments();
  }, []);

  const handleRespond = async (id, status) => {
    setRespondingId(id);
    try {
      const res = await axiosInstance.post(`tours/tour-guide-assignments/${id}/respond/`, { status });
      // Update the assignment status in local state
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === id ? { ...assignment, status: res.data.status, responded_at: res.data.responded_at } : assignment
        )
      );
    } catch (err) {
      alert("Failed to respond to assignment.");
    } finally {
      setRespondingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Skeleton variant="rectangular" height={40} className="mb-4" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!assignments.length)
    return <p className="p-6 text-center text-gray-600 dark:text-gray-400">No assignments found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Guide Assignments</h2>

      <ul className="space-y-4">
        {assignments.map(({ id, tour, status, assigned_at, responded_at }) => (
          <li key={id} className="p-4 border rounded bg-gray-50 dark:bg-gray-900">
            <h3 className="text-lg font-bold">{tour_title(tour)}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dates: {tour.start_date} → {tour.end_date}
            </p>
            <p>Status: <span className="capitalize">{status}</span></p>
            <p>Assigned at: {new Date(assigned_at).toLocaleString()}</p>
            {responded_at && <p>Responded at: {new Date(responded_at).toLocaleString()}</p>}

            {status === "pending" && (
              <div className="mt-2 flex gap-2">
                <button
                  disabled={respondingId === id}
                  onClick={() => handleRespond(id, "accepted")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Accept
                </button>
                <button
                  disabled={respondingId === id}
                  onClick={() => handleRespond(id, "declined")}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  Decline
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function tour_title(tour) {
  return tour?.title || "Tour";
}
