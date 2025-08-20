// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../../api/axiosInstance";

// export default function ParticipantsTab({ tourId }) {
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchParticipants() {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axiosInstance.get(`/tours/${tourId}/participants/`);
//         setParticipants(res.data);
//         console.log("participants data");
//         console.log(res.data);
//       } catch (err) {
//         setError("Failed to load participants.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchParticipants();
//   }, [tourId]);

//   if (loading) {
//     return <p>Loading participants...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">{error}</p>;
//   }

//   if (participants.length === 0) {
//     return <p>No participants found for this tour.</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Participants</h2>
//       <ul className="space-y-2">
//         {participants.map((participant) => (
//           <li
//             key={participant.id}
//             className="p-2 border rounded bg-gray-50 dark:bg-gray-800"
//           >
//             <p>
//               <strong>Name:</strong> {participant.name || participant.email}
//             </p>
//             <p>
//               <strong>Email:</strong> {participant.email}
//             </p>
//             {/* Add more participant info as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react"; 
// import axiosInstance from "../../../../api/axiosInstance";
// import { useAuth } from "../../../../context/AuthContext";

// export default function ParticipantsTab({ tourId }) {
//   const { user } = useAuth();
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch participants
//   const fetchParticipants = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axiosInstance.get(`/tours/${tourId}/participants/`);
//       setParticipants(res.data);
//       console.log("participants data", res.data);
//     } catch (err) {
//       setError("Failed to load participants.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [tourId]);

//   // Handle approval (for organizers/admins)
//   const handleApprove = async (participantId) => {
//     try {
//       await axiosInstance.patch(`/tours/participants/${participantId}/approve/`);
//       fetchParticipants(); // refresh list
//     } catch (err) {
//       console.error("Failed to approve participant", err);
//       setError("Failed to approve participant.");
//     }
//   };

//   if (loading) return <p>Loading participants...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;
//   if (participants.length === 0) return <p>No participants found for this tour.</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Participants</h2>
//       <ul className="space-y-2">
//         {participants.map((participant) => (
//           <li
//             key={participant.id}
//             className="p-2 border rounded bg-gray-50 dark:bg-gray-800 flex justify-between items-center"
//           >
//             <div>
//               <p><strong>Name:</strong> {participant.name || participant.email}</p>
//               <p><strong>Email:</strong> {participant.email}</p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 <span
//                   className={`px-2 py-1 rounded-full text-sm ${
//                     participant.status === "approved"
//                       ? "bg-green-100 text-green-600"
//                       : participant.status === "pending"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {participant.status || "none"}
//                 </span>
//               </p>
//             </div>

//             {/* Only admins/organizers can approve pending participants */}
//             {user?.role !== "tourist" && participant.status === "pending" && (
//               <button
//                 onClick={() => handleApprove(participant.id)}
//                 className="ml-4 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
//               >
//                 Approve
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// // src/pages/dashboard/ParticipantsTab.jsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../../../context/AuthContext";
// import axiosInstance from "../../../../api/axiosInstance";

// export default function ParticipantsTab({ tourId }) {
//   const { user } = useAuth(); // user object from AuthContext
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch tour details (with participants)
//   const fetchParticipants = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/tours/${tourId}/`);
//       setParticipants(res.data.participants || []);
//     } catch (err) {
//       console.error("Failed to load participants", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Approve/Reject API calls
//   const updateStatus = async (participantId, action) => {
//     try {
//       await axiosInstance.patch(`/tours/participants/${participantId}/${action}/`);
//       fetchParticipants(); // refresh after update
//     } catch (err) {
//       console.error(`Failed to ${action} participant`, err);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [tourId]);

//   if (loading) {
//     return <div className="p-4 text-gray-500">Loading participants...</div>;
//   }

//   if (!participants.length) {
//     return <div className="p-4 text-gray-500">No participants yet.</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Participants</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border rounded-lg">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
              
//               {/* <th className="px-4 py-2 text-left">Name</th> */}
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               {user?.role === "organizer" && <th className="px-4 py-2">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {participants.map((participant) => (
//               <tr key={participant.id} className="border-t">
//                 {/* <td className="px-4 py-2">
//                 <td className="px-4 py-2"> {participant.name || participant.email}</td>
//                 </td> */}
//                 <td className="px-4 py-2">{participant.email}</td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium capitalize
//                       ${
//                         participant.status === "approved"
//                           ? "bg-green-100 text-green-700"
//                           : participant.status === "pending"
//                           ? "bg-yellow-100 text-yellow-500"
//                           : participant.status === "rejected"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-gray-100 text-gray-700"
//                       }`}
//                   >
//                     {participant.status}
//                   </span>
//                 </td>

//                 {/* Organizer-only actions */}
//                 {user?.role === "organizer" && (
//                   <td className="px-4 py-2 space-x-2">
//                     {participant.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() => updateStatus(participant.id, "approve")}
//                           className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(participant.id, "reject")}
//                           className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import axiosInstance from "../../../../api/axiosInstance";

export default function ParticipantsTab({ tourId }) {
  const { user } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/tours/${tourId}/`);
      setParticipants(res.data.participants || []);
    } catch (err) {
      console.error("Failed to load participants", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (participantId, action) => {
    try {
      await axiosInstance.patch(`/tours/participants/${participantId}/${action}/`);
      fetchParticipants();
    } catch (err) {
      console.error(`Failed to ${action} participant`, err);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [tourId]);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading participants...</div>;
  }

  if (!participants.length) {
    return <div className="p-4 text-gray-500">No participants yet.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Participants</h2>

      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border rounded-lg bg-gray-50 dark:bg-slate-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              {user?.role === "organizer" && <th className="px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      p.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : p.status === "pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : p.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                {user?.role === "organizer" && (
                  <td className="px-4 py-2 space-x-2">
                    {p.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(p.id, "approve")}
                          className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(p.id, "reject")}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked cards for small screens */}
      <div className="md:hidden flex flex-col gap-3">
        {participants.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 bg-white dark:bg-gray-700">
            <p className="font-semibold">{p.email}</p>
            <p className="mt-1">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                  p.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : p.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : p.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {p.status}
              </span>
            </p>
            {user?.role === "organizer" && p.status === "pending" && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStatus(p.id, "approve")}
                  className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(p.id, "reject")}
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
