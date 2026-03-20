import React, { useEffect, useState } from "react";
import { FiCheck, FiX, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import axiosInstance from "../../../api/axiosInstance";

// Status colors
const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

// Guide checkbox with tooltip for already assigned
function GuideCheckbox({ guide, selected, onToggle, disabled }) {
  return (
    <label
      className={`flex items-center gap-2 mb-1 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title={disabled ? "Guide already assigned" : ""}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(guide.id)}
        disabled={disabled}
        className="accent-brand"
      />
      <span>
        {guide.user_name} ({guide.user_email})
      </span>
    </label>
  );
}

// Single guide assignment row
function GuideAssignmentItem({ assignment, userRole, onAction }) {
  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg bg-white dark:bg-slate-800">
      <div className="flex-1">
        <p className="font-medium">{assignment.guide_email}</p>
        {assignment.assigned_at && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Assigned: {new Date(assignment.assigned_at).toLocaleString()}
          </p>
        )}
        {assignment.responded_at && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Responded: {new Date(assignment.responded_at).toLocaleString()}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <span
          className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
            STATUS_COLORS[assignment.status] || "bg-gray-200 text-gray-800"
          }`}
        >
          {assignment.status === "accepted" && <FiCheck />}
          {assignment.status === "declined" && <FiX />}
          {assignment.status}
        </span>

        {(userRole === "admin" || userRole === "organizer") && (
          <div className="flex gap-2">
            {userRole === "admin" && assignment.status !== "accepted" && (
              <button
                onClick={() => onAction(assignment.id, "accepted")}
                className="text-green-600 hover:text-green-800"
                title="Accept"
              >
                <FiCheck />
              </button>
            )}
            {userRole === "admin" && assignment.status !== "declined" && (
              <button
                onClick={() => onAction(assignment.id, "declined")}
                className="text-red-600 hover:text-red-800"
                title="Decline"
              >
                <FiX />
              </button>
            )}
            {assignment.status === "pending" && (
              <button
                onClick={() => onAction(assignment.id, "remove")}
                className="text-gray-600 hover:text-gray-800"
                title="Remove"
              >
                <FiTrash2 />
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default function GuidesTab({ tourId, userRole }) {
  const [assignedGuides, setAssignedGuides] = useState([]);
  const [allGuides, setAllGuides] = useState([]);
  const [selectedGuideIds, setSelectedGuideIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });
  const [collapsed, setCollapsed] = useState(true); 

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar({ open: false, message: "", type: "" }), 4000);
  };

  useEffect(() => {
    async function fetchGuides() {
      setLoading(true);
      try {
        const assignedRes = await axiosInstance.get(`/tours/${tourId}/guides/`);
        setAssignedGuides(assignedRes.data);

        if (["admin", "organizer"].includes(userRole)) {
          const allRes = await axiosInstance.get(`/tours/guides/`, {
            params: { tour_id: tourId },
          });
          setAllGuides(allRes.data.results);
          console.log(allRes.data);
          // console.log("allRes.data");
          // console.log(allRes.data);
        }
      } catch (err) {
        console.error(err);
        showSnackbar("Failed to load guides", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchGuides();
  }, [tourId, userRole]);

  const handleSelectGuide = (guideId) => {
    setSelectedGuideIds((prev) =>
      prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId]
    );
  };

  const handleAssign = async () => {
    if (!selectedGuideIds.length) return showSnackbar("Select at least one guide.", "error");

    setAssigning(true);
    try {
      const res = await axiosInstance.post(`/tours/tour-guide-assignments/assign-guide/`, {
        tour_id: tourId,
        guide_ids: selectedGuideIds,
      });
      setAssignedGuides((prev) => [...prev, ...res.data.created]);
      if (res.data.skipped.length)
        showSnackbar(`Some guides skipped: ${res.data.skipped.map((s) => s.guide_id).join(", ")}`, "warning");
      else showSnackbar("Guides assigned successfully!", "success");

      setSelectedGuideIds([]);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to assign guides.", "error");
    } finally {
      setAssigning(false);
    }
  };

  const handleAction = async (assignmentId, action) => {
    try {
      if (action === "remove") {
        await axiosInstance.delete(`/tours/tour-guide-assignments/${assignmentId}/cancel/`);
        setAssignedGuides((prev) => prev.filter((a) => a.id !== assignmentId));
        showSnackbar("Assignment removed.", "success");
      } else {
        await axiosInstance.patch(`/tours/tour-guide-assignments/${assignmentId}/`, { status: action });
        setAssignedGuides((prev) =>
          prev.map((a) => (a.id === assignmentId ? { ...a, status: action } : a))
        );
        showSnackbar(`Assignment ${action}.`, "success");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Action failed.", "error");
    }
  };

  if (loading) return <p>Loading guides...</p>;

  return (
    <div className="mt-6 p-4 border rounded shadow-sm bg-gray-50 dark:bg-slate-700">
      <h3 className="text-xl font-semibold mb-4">Guides</h3>

      {/* Available Guides */}
      {["admin", "organizer"].includes(userRole) && (
        <div className="mb-4">
          <p className="mb-2 font-medium">Available Guides:</p>
          <div className="max-h-56 overflow-auto border rounded p-2 bg-white dark:bg-slate-800">
            {allGuides.length === 0 ? (
              <p className="text-gray-500">No guides available.</p>
            ) : (
              
              allGuides.map((guide) => (
                <GuideCheckbox
                  key={guide.id}
                  guide={guide}
                  selected={selectedGuideIds.includes(guide.id)}
                  onToggle={handleSelectGuide}
                  // disabled={assignedGuides.some(
                  //   (a) => a.guide.id === guide.id && a.status !== "declined"
                  // )}
                />
              ))
            )}
          </div>
          <button
            onClick={handleAssign}
            disabled={assigning}
            className="mt-3 px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark disabled:opacity-50"
          >
            {assigning ? "Assigning..." : "Assign Selected Guides"}
          </button>
        </div>
      )}

      {/* Assigned Guides */}
      <div>
        <div className="flex justify-between items-center mb-2 sm:hidden cursor-pointer" onClick={() => setCollapsed((prev) => !prev)}>
          <p className="font-medium">Assigned Guides ({assignedGuides.length})</p>
          {collapsed ? <FiChevronDown /> : <FiChevronUp />}
        </div>

        <ul className={`${collapsed ? "hidden sm:block" : "block"} space-y-2 max-h-72 overflow-auto`}>
          {assignedGuides.length === 0 ? (
            <p className="text-gray-500">No guides assigned yet.</p>
          ) : (
            assignedGuides.map((assignment) => (
              <GuideAssignmentItem
                key={assignment.id}
                assignment={assignment}
                userRole={userRole}
                onAction={handleAction}
              />
            ))
          )}
        </ul>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white z-50 transition-transform transform ${
            snackbar.type === "success"
              ? "bg-green-600"
              : snackbar.type === "warning"
              ? "bg-yellow-500"
              : "bg-red-600"
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
