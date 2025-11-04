// // import React, { useEffect, useState } from "react";
// // import axiosInstance from "../../../../api/axiosInstance";

// // export default function GuidesTab({ tourId }) {
// //   const [guides, setGuides] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     async function fetchGuides() {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const res = await axiosInstance.get(`/tours/${tourId}/guides/`);
// //         setGuides(res.data);
// //         console.log("guide data");
// //         console.log(res.data);
// //       } catch (err) {
// //         setError("Failed to load guides.");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchGuides();
// //   }, [tourId]);

// //   if (loading) {
// //     return <p>Loading guides...</p>;
// //   }

// //   if (error) {
// //     return <p className="text-red-600">{error}</p>;
// //   }

// //   if (guides.length === 0) {
// //     return <p>No guides assigned for this tour.</p>;
// //   }

// //   return (
// //     <div>
// //       <h2 className="text-xl font-semibold mb-4">Guides</h2>
// //       <ul className="space-y-2">
// //         {guides.map((guide) => (
// //           <li
// //             key={guide.id}
// //             className="p-2 border rounded bg-gray-50 dark:bg-gray-800"
// //           >
// //             {/* <p>
// //               <strong>Name:</strong> {guide.name || guide.email}
// //             </p> */}
// //             <p>
// //               <strong>Email:</strong> {guide.guide_email}
// //             </p>
// //             <p>
// //               <strong>Contact no:</strong> {guide.guide.contact_number}
// //             </p>
            
// //             {guide.status == "accepted" ?
// //             <><p>
// //               <strong>Assigned At:</strong> {guide.assigned_at}
// //             </p>
// //             <p className="text-green">
// //               <strong>Status:</strong> <span className="text-green-700 capitalize">{guide.status}</span>
// //             </p>
// //              <p>
// //               <strong>Responded_at At:</strong> {guide.responded_at}
// //             </p></>: <p>
// //               <strong>Status:</strong> <span className="text-yellow-600 capitalize">{guide.status}</span>
// //             </p>
// //             }
            
           
// //             {/* Add more guide info as needed */}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../../api/axiosInstance";

// const STATUS_COLORS = {
//   pending: "bg-yellow-400 text-yellow-900",
//   accepted: "bg-green-500 text-green-900",
//   declined: "bg-red-500 text-red-900",
// };

// export default function GuidesTab({ tourId, userRole }) {
//   const [assignedGuides, setAssignedGuides] = useState([]);
//   const [allGuides, setAllGuides] = useState([]);
//   const [selectedGuideIds, setSelectedGuideIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assigning, setAssigning] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });

//   // Fetch assigned guides and all guides
//   useEffect(() => {
//     async function fetchGuides() {
//       setLoading(true);
//       try {
//         const assignedRes = await axiosInstance.get(`/tours/${tourId}/guides/`);
//         setAssignedGuides(assignedRes.data);

//         if (userRole === "admin" || userRole === "organizer") {
//           const allRes = await axiosInstance.get(`/tours/guides/`);
//           setAllGuides(allRes.data);
//         }
//       } catch (error) {
//         console.error(error);
//         setSnackbar({ open: true, message: "Failed to load guides.", type: "error" });
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchGuides();
//   }, [tourId, userRole]);

//   // Checkbox selection
//   const handleSelectGuide = (guideId) => {
//     setSelectedGuideIds((prev) =>
//       prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId]
//     );
//   };

//   // Assign new guides
// const handleAssign = async () => {
//   if (selectedGuideIds.length === 0) {
//     setSnackbar({ open: true, message: "Select at least one guide.", type: "error" });
//     return;
//   }
//   setAssigning(true);
//   try {
//     const payload = { tour_id: tourId, guide_ids: selectedGuideIds };
//     const res = await axiosInstance.post(`/tours/tour-guide-assignments/assign-guide/`, payload);

//     // Merge newly created assignments
//     setAssignedGuides((prev) => [...prev, ...res.data.created]);

//     // Handle skipped assignments
//     if (res.data.skipped.length > 0) {
//       const skippedMsg = res.data.skipped.map(s => `Guide ${s.guide_id}: ${s.reason}`).join(", ");
//       setSnackbar({ open: true, message: `Some guides skipped: ${skippedMsg}`, type: "warning" });
//     } else {
//       setSnackbar({ open: true, message: "Guides assigned successfully!", type: "success" });
//     }

//     setSelectedGuideIds([]);
//   } catch (error) {
//     console.error(error);
//     setSnackbar({ open: true, message: "Failed to assign guides.", type: "error" });
//   } finally {
//     setAssigning(false);
//   }
// };

//   // Admin actions: accept/decline/remove
//   const handleAdminAction = async (assignmentId, action) => {
//     try {
//       if (action === "remove") {
//         await axiosInstance.delete(`/tours/tour-guide-assignments/${assignmentId}/cancel/`);
//         setAssignedGuides((prev) => prev.filter((a) => a.id !== assignmentId));
//         setSnackbar({ open: true, message: "Assignment removed.", type: "success" });
//       } else {
//         await axiosInstance.patch(`/tours/tour-guide-assignments/${assignmentId}/`, { status: action });
//         setAssignedGuides((prev) =>
//           prev.map((a) => (a.id === assignmentId ? { ...a, status: action } : a))
//         );
//         setSnackbar({ open: true, message: `Assignment ${action}.`, type: "success" });
//       }
//     } catch (error) {
//       console.error(error);
//       setSnackbar({ open: true, message: "Action failed.", type: "error" });
//     }
//   };

//   if (loading) return <p>Loading guides...</p>;

//   return (
//     <div className="mt-6 p-4 border rounded shadow-sm bg-gray-50 dark:bg-slate-700">
//       <h3 className="text-xl font-semibold mb-4">Guides</h3>

//       {/* Assign new guides (only admin/organizer) */}
//       {(userRole === "admin" || userRole === "organizer") && (
//         <div className="mb-4">
//           <p className="mb-2 font-medium">Available Guides:</p>
//           <div className="max-h-48 overflow-auto border rounded p-2 bg-white dark:bg-slate-800">
//             {allGuides.length === 0 && <p>No guides available.</p>}
//             {allGuides.map((guide) => (
//               <label key={guide.id} className="flex items-center gap-2 mb-1 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={selectedGuideIds.includes(guide.id)}
//                   onChange={() => handleSelectGuide(guide.id)}
//                   className="accent-indigo-600"
//                   disabled={assignedGuides.some(
//                     (a) => a.guide.id === guide.id && a.status !== "declined"
//                   )}
//                 />
//                 <span>
//                   {guide.user_name} ({guide.user_email})
//                 </span>
//               </label>
//             ))}
//           </div>
//           <button
//             onClick={handleAssign}
//             disabled={assigning}
//             className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
//           >
//             {assigning ? "Assigning..." : "Assign Selected Guides"}
//           </button>
//         </div>
//       )}

//       {/* Assigned Guides */}
//       <div>
//         {assignedGuides.length === 0 ? (
//           <p>No guides assigned yet.</p>
//         ) : (
//           <ul className="space-y-2 max-h-72 overflow-auto">
//             {assignedGuides.map((assignment) => (
//               <li
//                 key={assignment.id}
//                 className="flex items-center justify-between p-2 border rounded bg-white dark:bg-slate-800"
//               >
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     {assignment.guide_email}
//                   </p>
//                   {assignment.assigned_at && (
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Assigned At: {assignment.assigned_at}
//                     </p>
//                   )}
//                   {assignment.responded_at && (
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Responded At: {assignment.responded_at}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-semibold ${
//                       STATUS_COLORS[assignment.status] || "bg-gray-300 text-gray-700"
//                     }`}
//                   >
//                     {assignment.status}
//                   </span>

//                   {/* Admin override buttons */}
//                   {userRole === "admin" && (
//                     <div className="flex gap-2">
//                       {assignment.status !== "accepted" && (
//                         <button
//                           onClick={() => handleAdminAction(assignment.id, "accepted")}
//                           className="text-green-600 hover:text-green-800"
//                           title="Accept"
//                         >
//                           ✓
//                         </button>
//                       )}
//                       {assignment.status !== "declined" && (
//                         <button
//                           onClick={() => handleAdminAction(assignment.id, "declined")}
//                           className="text-red-600 hover:text-red-800"
//                           title="Decline"
//                         >
//                           ✗
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleAdminAction(assignment.id, "remove")}
//                         className="text-gray-600 hover:text-gray-800"
//                         title="Remove"
//                       >
//                         🗑
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Snackbar */}
//       {snackbar.open && (
//         <div
//           className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white z-50 transition-opacity ${
//             snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
//           }`}
//         >
//           {snackbar.message}
//           <button
//             className="ml-3 font-bold"
//             onClick={() => setSnackbar({ open: false, message: "", type: "" })}
//           >
//             ×
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../../api/axiosInstance";

// // Map status to colors for consistent UI
// const STATUS_COLORS = {
//   pending: "bg-yellow-400 text-yellow-900",
//   accepted: "bg-green-500 text-green-900",
//   declined: "bg-red-500 text-red-900",
// };

// /** Checkbox for selecting a guide to assign */
// function GuideCheckbox({ guide, selected, onToggle, disabled }) {
//   return (
//     <label className="flex items-center gap-2 mb-1 cursor-pointer">
//       <input
//         type="checkbox"
//         checked={selected}
//         onChange={() => onToggle(guide.id)}
//         className="accent-brand"
//         disabled={disabled}
//       />
//       <span>
//         {guide.user_name} ({guide.user_email})
//       </span>
//     </label>
//   );
// }

// /** Renders a single guide assignment row */
// function GuideAssignmentItem({ assignment, userRole, onAction }) {
//   return (
//     <li className="flex items-center justify-between p-2 border rounded bg-white dark:bg-slate-800">
//       <div>
//         <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.guide_email}</p>
//         {assignment.assigned_at && (
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             Assigned At: {new Date(assignment.assigned_at).toLocaleString()}
//           </p>
//         )}
//         {assignment.responded_at && (
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             Responded At: {new Date(assignment.responded_at).toLocaleString()}
//           </p>
//         )}
//       </div>

//       <div className="flex items-center gap-3">
//         {/* Status Badge */}
//         <span
//           className={`px-2 py-1 rounded text-xs font-semibold ${
//             STATUS_COLORS[assignment.status] || "bg-gray-300 text-gray-700"
//           }`}
//         >
//           {assignment.status}
//         </span>

//         {/* Actions: both admin and organizer can remove pending ones */}
//         {(userRole === "admin" || userRole === "organizer") && (
//           <div className="flex gap-2">
//             {userRole === "admin" && assignment.status !== "accepted" && (
//               <button
//                 onClick={() => onAction(assignment.id, "accepted")}
//                 className="text-green-600 hover:text-green-800"
//                 title="Accept"
//               >
//                 ✓
//               </button>
//             )}
//             {userRole === "admin" && assignment.status !== "declined" && (
//               <button
//                 onClick={() => onAction(assignment.id, "declined")}
//                 className="text-red-600 hover:text-red-800"
//                 title="Decline"
//               >
//                 ✗
//               </button>
//             )}
//             {assignment.status === "pending" && (
//               <button
//                 onClick={() => onAction(assignment.id, "remove")}
//                 className="text-gray-600 hover:text-gray-800"
//                 title="Remove"
//               >
//                 🗑
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </li>
//   );
// }

// export default function GuidesTab({ tourId, userRole }) {
//   const [assignedGuides, setAssignedGuides] = useState([]);
//   const [allGuides, setAllGuides] = useState([]);
//   const [selectedGuideIds, setSelectedGuideIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assigning, setAssigning] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });

//   // Snackbar helper
//   const showSnackbar = (message, type) =>
//     setSnackbar({ open: true, message, type });

//   // Fetch assigned & available guides
//   useEffect(() => {
//     async function fetchGuides() {
//       setLoading(true);
//       try {
//         const assignedRes = await axiosInstance.get(`/tours/${tourId}/guides/`);
//         setAssignedGuides(assignedRes.data);

//         if (["admin", "organizer"].includes(userRole)) {
//           const allRes = await axiosInstance.get(`/tours/guides/`);
//           setAllGuides(allRes.data);
//         }
//       } catch (error) {
//         console.error(error);
//         showSnackbar("Failed to load guides.", "error");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchGuides();
//   }, [tourId, userRole]);

//   // Toggle guide selection
//   const handleSelectGuide = (guideId) => {
//     setSelectedGuideIds((prev) =>
//       prev.includes(guideId)
//         ? prev.filter((id) => id !== guideId)
//         : [...prev, guideId]
//     );
//   };

//   // Assign selected guides
//   const handleAssign = async () => {
//     if (selectedGuideIds.length === 0) {
//       showSnackbar("Select at least one guide.", "error");
//       return;
//     }
//     setAssigning(true);
//     try {
//       const payload = { tour_id: tourId, guide_ids: selectedGuideIds };
//       const res = await axiosInstance.post(
//         `/tours/tour-guide-assignments/assign-guide/`,
//         payload
//       );

//       // Merge new assignments
//       setAssignedGuides((prev) => [...prev, ...res.data.created]);

//       if (res.data.skipped.length > 0) {
//         const skippedMsg = res.data.skipped
//           .map((s) => `Guide ${s.guide_id}: ${s.reason}`)
//           .join(", ");
//         showSnackbar(`Some guides skipped: ${skippedMsg}`, "warning");
//       } else {
//         showSnackbar("Guides assigned successfully!", "success");
//       }

//       setSelectedGuideIds([]);
//     } catch (error) {
//       console.error(error);
//       showSnackbar("Failed to assign guides.", "error");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   // Handle admin/organizer actions
//   const handleAction = async (assignmentId, action) => {
//     try {
//       if (action === "remove") {
//         await axiosInstance.delete(
//           `/tours/tour-guide-assignments/${assignmentId}/cancel/`
//         );
//         setAssignedGuides((prev) =>
//           prev.filter((a) => a.id !== assignmentId)
//         );
//         showSnackbar("Assignment removed.", "success");
//       } else {
//         await axiosInstance.patch(
//           `/tours/tour-guide-assignments/${assignmentId}/`,
//           { status: action }
//         );
//         setAssignedGuides((prev) =>
//           prev.map((a) =>
//             a.id === assignmentId ? { ...a, status: action } : a
//           )
//         );
//         showSnackbar(`Assignment ${action}.`, "success");
//       }
//     } catch (error) {
//       console.error(error);
//       showSnackbar("Action failed.", "error");
//     }
//   };

//   if (loading) return <p>Loading guides...</p>;

//   return (
//     <div className="mt-6 p-4 border rounded shadow-sm bg-gray-50 dark:bg-slate-700">
//       <h3 className="text-xl font-semibold mb-4">Guides</h3>

//       {/* Guide Assignment Section */}
//       {["admin", "organizer"].includes(userRole) && (
//         <div className="mb-4">
//           <p className="mb-2 font-medium">Available Guides:</p>
//           <div className="max-h-48 overflow-auto border rounded p-2 bg-white dark:bg-slate-800">
//             {allGuides.length === 0 && <p>No guides available.</p>}
//             {allGuides.map((guide) => (
//               <GuideCheckbox
//                 key={guide.id}
//                 guide={guide}
//                 selected={selectedGuideIds.includes(guide.id)}
//                 onToggle={handleSelectGuide}
//                 disabled={assignedGuides.some(
//                   (a) => a.guide.id === guide.id && a.status !== "declined"
//                 )}
//               />
//             ))}
//           </div>
//           <button
//             onClick={handleAssign}
//             disabled={assigning}
//             className="mt-3 px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark disabled:opacity-50"
//           >
//             {assigning ? "Assigning..." : "Assign Selected Guides"}
//           </button>
//         </div>
//       )}

//       {/* Assigned Guides List */}
//       <div>
//         {assignedGuides.length === 0 ? (
//           <p>No guides assigned yet.</p>
//         ) : (
//           <ul className="space-y-2 max-h-72 overflow-auto">
//             {assignedGuides.map((assignment) => (
//               <GuideAssignmentItem
//                 key={assignment.id}
//                 assignment={assignment}
//                 userRole={userRole}
//                 onAction={handleAction}
//               />
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Snackbar Notification */}
//       {snackbar.open && (
//         <div
//           className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white z-50 transition-opacity ${
//             snackbar.type === "success"
//               ? "bg-green-600"
//               : snackbar.type === "warning"
//               ? "bg-yellow-500"
//               : "bg-red-600"
//           }`}
//         >
//           {snackbar.message}
//           <button
//             className="ml-3 font-bold"
//             onClick={() => setSnackbar({ open: false, message: "", type: "" })}
//           >
//             ×
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { FiCheck, FiX, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  const [collapsed, setCollapsed] = useState(true); // <-- new state for collapsible list

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
          setAllGuides(allRes.data);
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
