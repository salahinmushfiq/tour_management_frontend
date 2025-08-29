import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const STATUS_COLORS = {
  pending: "bg-yellow-400 text-yellow-900",
  accepted: "bg-green-500 text-green-900",
  declined: "bg-red-500 text-red-900",
};

export default function AssignGuide({ tourId, userRole }) {
  const [assignedGuides, setAssignedGuides] = useState([]);
  const [allGuides, setAllGuides] = useState([]);
  const [selectedGuideIds, setSelectedGuideIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });

  // Fetch assigned guides and all guides on mount or tourId change
  useEffect(() => {
    async function fetchData() {
      console.log(tourId);  
      setLoading(true);
      try {
        // Assigned guides for this tour
        const assignedRes = await axiosInstance.get(`/tours/${tourId}/guides/`);
        setAssignedGuides(assignedRes.data);

        // All guides (for assigning)
        const allRes = await axiosInstance.get(`/tours/guides/`);
        setAllGuides(allRes.data);
      } catch (error) {
        console.error("Failed to load guides:", error);
        setSnackbar({ open: true, message: "Failed to load guides.", type: "error" });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [tourId]);

  // Handle checkbox changes in multi-select guide list
  const handleSelectGuide = (guideId) => {
    setSelectedGuideIds((prev) =>
      prev.includes(guideId)
        ? prev.filter((id) => id !== guideId)
        : [...prev, guideId]
    );
  };

  // Assign selected guides
  const handleAssign = async () => {
    if (selectedGuideIds.length === 0) {
      setSnackbar({ open: true, message: "Select at least one guide to assign.", type: "error" });
      return;
    }

    setAssigning(true);
    try {
      const payload = { tour_id: tourId, guide_ids: selectedGuideIds };
      const res = await axiosInstance.post(`tours/tour-guide-assignments/assign-guide/`, payload);
      console.log(res.data);
      setAssignedGuides((prev) => [...prev, ...res.data]);
      setSelectedGuideIds([]);
      setSnackbar({ open: true, message: "Guides assigned successfully!", type: "success" });
    } catch (error) {
      console.error("Assigning guides failed:", error);
      setSnackbar({ open: true, message: "Failed to assign guides.", type: "error" });
    } finally {
      setAssigning(false);
    }
  };

  // Admin override: accept / decline / remove
  const handleAdminAction = async (assignmentId, action) => {
    try {
      if (action === "remove") {
        await axiosInstance.delete(`/tour-guide-assignments/${assignmentId}/cancel/`);
        setAssignedGuides((prev) => prev.filter((a) => a.id !== assignmentId));
        setSnackbar({ open: true, message: "Assignment removed.", type: "success" });
      } else {
        await axiosInstance.patch(`/tour-guide-assignments/${assignmentId}/`, { status: action });
        setAssignedGuides((prev) =>
          prev.map((a) => (a.id === assignmentId ? { ...a, status: action } : a))
        );
        setSnackbar({ open: true, message: `Assignment ${action}.`, type: "success" });
      }
    } catch (error) {
      console.error("Admin action failed:", error);
      setSnackbar({ open: true, message: "Action failed.", type: "error" });
    }
  };

  if (loading) return <p>Loading guides...</p>;

  return (
    <div className="mt-10 p-4 border rounded shadow-sm bg-gray-50 dark:bg-slate-700">
      <h3 className="text-xl font-semibold mb-4">Assign Guides</h3>

      {/* Assign new guides multi-select */}
      <div className="mb-4">
        <p className="mb-2 font-medium">Available Guides:</p>
        <div className="max-h-48 overflow-auto border rounded p-2 bg-white dark:bg-slate-800">
          {allGuides.length === 0 && <p>No guides available.</p>}
          {allGuides.map((guide) => (
            <label key={guide.id} className="flex items-center gap-2 mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGuideIds.includes(guide.id)}
                onChange={() => handleSelectGuide(guide.id)}
                className="accent-indigo-600"
                disabled={assignedGuides.some((a) => a.guide.id === guide.id && a.status !== "declined")}
              />
              <span>{guide.user_name} ({guide.user_email})</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleAssign}
          disabled={assigning}
          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {assigning ? "Assigning..." : "Assign Selected Guides"}
        </button>
      </div>

      {/* Current Assignments */}
      <div>
        <p className="mb-2 font-medium">Current Assignments:</p>
        {assignedGuides.length === 0 ? (
          <p>No guides assigned yet.</p>
        ) : (
          <ul className="space-y-2 max-h-48 overflow-auto">
            {assignedGuides.map((assignment) => (
              <li
                key={assignment.id}
                className="flex items-center justify-between p-2 border rounded bg-white dark:bg-slate-800"
              >
                <div>
                  {/* <p className="font-semibold">{assignment.guide}</p> */}
                  <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.guide_email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      STATUS_COLORS[assignment.status] || "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {assignment.status}
                  </span>

                  {/* Admin override buttons */}
                  {userRole === "admin" && (
                    <div className="flex gap-2">
                      {assignment.status !== "accepted" && (
                        <button
                          onClick={() => handleAdminAction(assignment.id, "accepted")}
                          className="text-green-600 hover:text-green-800"
                          title="Accept"
                        >
                          ✓
                        </button>
                      )}
                      {assignment.status !== "declined" && (
                        <button
                          onClick={() => handleAdminAction(assignment.id, "declined")}
                          className="text-red-600 hover:text-red-800"
                          title="Decline"
                        >
                          ✗
                        </button>
                      )}
                      <button
                        onClick={() => handleAdminAction(assignment.id, "remove")}
                        className="text-gray-600 hover:text-gray-800"
                        title="Remove"
                      >
                        🗑
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white z-50 transition-opacity ${
            snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {snackbar.message}
          <button
            className="ml-3 font-bold"
            onClick={() => setSnackbar({ open: false, message: "", type: "" })}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
