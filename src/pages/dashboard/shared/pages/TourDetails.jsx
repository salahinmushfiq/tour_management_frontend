// import React, { useEffect, useState, useRef } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import  axiosInstance  from '../../api/axiosInstance';
// function formatDate(dateStr) {
//   if (!dateStr) return "";
//   const d = new Date(dateStr);
//   return d.toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// export default function TourDetails() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);

//   // Snackbar state
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });

//   // Modal state
//   const [showModal, setShowModal] = useState(false);

//   const mapContainer = useRef(null);

//   const Skeleton = ({ height = 20, width = "100%", className = "" }) => (
//     <div
//       className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
//       style={{ height, width }}
//     />
//   );

//   // 🔹 Fetch Tour Details
//   useEffect(() => {
//     async function fetchTour() {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(`/tours/${id}/`);
//         setTour(res.data);
//       } catch (error) {
//         console.error("Failed to fetch tour details:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchTour();
//   }, [id]);

//   // 🔹 Handle Delete Tour
//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await axiosInstance.delete(`/tours/${id}/`);

//       // Close modal and show snackbar
//       setShowModal(false);
//       setSnackbar({ open: true, message: "Tour deleted successfully.", type: "success" });

//       // Redirect after short delay
//       setTimeout(() => {
//         navigate(
//           user.role === "admin"
//             ? "/dashboard/admin/tours"
//             : "/dashboard/organizer/tours"
//         );
//       }, 1500);
//     } catch (error) {
//       console.error("Failed to delete tour:", error);
//       setSnackbar({ open: true, message: "Failed to delete tour.", type: "error" });
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // 🔹 Loading Skeleton
//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 space-y-6">
//         <Skeleton height={30} width={250} />
//         <Skeleton height={20} width={150} />
//         <Skeleton height={400} />
//         <Skeleton height={20} />
//         <Skeleton height={40} width={120} />
//       </div>
//     );
//   }

//   // 🔹 Not Found / Error
//   if (!tour) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 text-center text-red-600">
//         Tour not found or failed to load.
//         <div className="mt-4">
//           <Link to="/dashboard/admin/tours" className="text-brand underline">
//             Back to Tours List
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // 🔹 Determine if user can Edit/Delete
//   const canEditOrDelete =
//     user.role === "admin" ||
//     (user.role === "organizer" && tour.organizer === user.email);

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow-md">
//       <Link
//         to={
//           user.role === "admin"
//             ? "/dashboard/admin/tours"
//             : user.role === "organizer"
//             ? "/dashboard/organizer/tours"
//             : "/unauthorized"
//         }
//         className="text-blue-600 hover:underline mb-4 inline-block"
//       >
//         ← Back to Tours
//       </Link>

//       <h1 className="text-3xl font-bold mb-2 dark:text-white">{tour.title}</h1>
//       <p className="text-sm text-gray-500 mb-6">
//         Organized by: <strong>{tour.organizer}</strong>
//       </p>

//       <img
//         src={tour.cover_image || "https://via.placeholder.com/800x300"}
//         alt={tour.title}
//         className="w-full h-72 object-cover rounded mb-6 shadow"
//       />

//       {/* 🔹 Conditional Edit/Delete Actions */}
//       {canEditOrDelete && (
//         <div className="flex gap-3 mb-6">
//           <Link
//             to={`/dashboard/${user.role}/tours/${tour.id}/edit`}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Edit
//           </Link>
//           <button
//             onClick={() => setShowModal(true)}
//             disabled={deleting}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
//           >
//             {deleting ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       )}

//       {/* 🔹 Tour Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* Left column */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2 dark:text-white">Details</h2>
//           <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
//             {tour.description || "No description available."}
//           </p>

//           <ul className="space-y-1 text-gray-700 dark:text-gray-300">
//             <li>
//               <strong>Category:</strong> {tour.category}
//             </li>
//             <li>
//               <strong>Cost per Person:</strong> $
//               {parseFloat(tour.cost_per_person).toFixed(2)}
//             </li>
//             <li>
//               <strong>Max Participants:</strong> {tour.max_participants}
//             </li>
//             <li>
//               <strong>Custom Group:</strong> {tour.is_custom_group ? "Yes" : "No"}
//             </li>

//             {/* Guides */}
//             {tour.guides?.length > 0 && (
//               <li>
//                 <strong>Guides:</strong>{" "}
//                 {tour.guides.map((g) => g.user_email || g.user_name).join(", ")}
//               </li>
//             )}

//             {/* Participants */}
//             {tour.participants?.length > 0 && (
//               <li>
//                 <strong>Participants:</strong>{" "}
//                 {tour.participants.map((p) => p.email).join(", ")}
//               </li>
//             )}
//           </ul>
//         </div>

//         {/* Right column */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2 dark:text-white">
//             Schedule & Location
//           </h2>
//           <ul className="text-gray-700 dark:text-gray-300 space-y-1">
//             <li>
//               <strong>Start Date:</strong> {formatDate(tour.start_date)}
//             </li>
//             <li>
//               <strong>End Date:</strong> {formatDate(tour.end_date)}
//             </li>
//             <li>
//               <strong>Start Location:</strong> {tour.start_location}
//             </li>
//             <li>
//               <strong>End Location:</strong> {tour.end_location}
//             </li>
//           </ul>

//           {/* Offers */}
//           {tour.offers?.length > 0 && (
//             <>
//               <h3 className="mt-6 mb-2 text-lg font-semibold dark:text-white">
//                 Offers & Discounts
//               </h3>
//               <ul className="space-y-3">
//                 {tour.offers.map((offer) => (
//                   <li
//                     key={offer.id}
//                     className="border rounded p-3 bg-gray-100 dark:bg-gray-800"
//                   >
//                     <h4 className="font-semibold">{offer.title}</h4>
//                     <p className="text-sm">{offer.description}</p>
//                     <p className="text-sm">
//                       <strong>Discount:</strong> {offer.discount_percent}%
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Valid from: {formatDate(offer.valid_from)}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Valid until: {formatDate(offer.valid_until)}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       </div>

//       <div
//         ref={mapContainer}
//         className="w-full h-96 rounded shadow-md border border-gray-300 dark:border-gray-700"
//       />

//       {/* 🔹 Delete Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//               Confirm Deletion
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Are you sure you want to delete this tour? This action cannot be undone.
//             </p>

//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleting}
//                 className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
//               >
//                 {deleting ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 Snackbar */}
//       {snackbar.open && (
//         <div
//           className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white z-50 transition-opacity ${
//             snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
//           }`}
//         >
//           {snackbar.message}
//         </div>
//       )}
//     </div>
//   );
// }




















// // ----------- Main TourDetails Component -----------
// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import {GuidesTab,OverviewTab,ParticipantsTab,OffersTab} from "../../";
// import { useAuth } from "../../../../context/AuthContext";
// import axiosInstance from "../../../../api/axiosInstance";


// export default function TourDetails() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);

//   const [activeTab, setActiveTab] = useState("overview");
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     description: "",
//     category: "",
//     cost_per_person: "",
//     max_participants: "",
//     is_custom_group: false,
//     start_date: "",
//     end_date: "",
//     start_location: "",
//     end_location: "",
//   });

//   useEffect(() => {
//     async function fetchTour() {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(`/tours/${id}/`);
//         setTour(res.data);
//         setFormData({
//           description: res.data.description || "",
//           category: res.data.category || "",
//           cost_per_person: res.data.cost_per_person ?? "",
//           max_participants: res.data.max_participants ?? "",
//           is_custom_group: res.data.is_custom_group || false,
//           start_date: res.data.start_date ? res.data.start_date.substring(0, 10) : "",
//           end_date: res.data.end_date ? res.data.end_date.substring(0, 10) : "",
//           start_location: res.data.start_location || "",
//           end_location: res.data.end_location || "",
//         });
//       } catch (error) {
//         console.error("Failed to fetch tour details:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchTour();
//   }, [id]);

//   const canEdit =
//     user.role === "admin" || (user.role === "organizer" && tour?.organizer === user.email);

//   async function handleSave() {
//     setError(null);
//     setSaving(true);

//     if (!formData.category.trim()) {
//       setError("Category is required.");
//       setSaving(false);
//       return;
//     }
//     if (!formData.start_date || !formData.end_date) {
//       setError("Start and end dates are required.");
//       setSaving(false);
//       return;
//     }

//     try {
//       const res = await axiosInstance.patch(`/tours/${id}/`, {
//         description: formData.description,
//         category: formData.category,
//         cost_per_person: parseFloat(formData.cost_per_person),
//         max_participants: parseInt(formData.max_participants, 10),
//         is_custom_group: formData.is_custom_group,
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         start_location: formData.start_location,
//         end_location: formData.end_location,
//       });
//       setTour(res.data);
//       setIsEditing(false);
//     } catch (err) {
//       setError("Failed to save changes.");
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   }

//   function handleCancel() {
//     if (tour) {
//       setFormData({
//         description: tour.description || "",
//         category: tour.category || "",
//         cost_per_person: tour.cost_per_person ?? "",
//         max_participants: tour.max_participants ?? "",
//         is_custom_group: tour.is_custom_group || false,
//         start_date: tour.start_date ? tour.start_date.substring(0, 10) : "",
//         end_date: tour.end_date ? tour.end_date.substring(0, 10) : "",
//         start_location: tour.start_location || "",
//         end_location: tour.end_location || "",
//       });
//     }
//     setError(null);
//     setIsEditing(false);
//   }

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 space-y-6">
//         <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded h-8 w-64" />
//         <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded h-5 w-40" />
//         <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded h-64" />
//         <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded h-5" />
//         <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded h-10 w-28" />
//       </div>
//     );
//   }

//   if (!tour) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 text-center text-red-600">
//         Tour not found or failed to load.
//         <div className="mt-4">
//           <Link to="/dashboard/admin/tours" className="text-brand underline">
//             Back to Tours List
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow-md">
//       <Link
//         to={
//           user.role === "admin"
//             ? "/dashboard/admin/tours"
//             : user.role === "organizer"
//             ? "/dashboard/organizer/tours"
//             : "/dashboard"
//         }
//         className="text-blue-600 hover:underline mb-4 inline-block"
//       >
//         ← Back
//       </Link>

//       <h1 className="text-3xl font-bold mb-1 dark:text-white">{tour.title}</h1>
//       <p className="text-sm text-gray-500 mb-4">
//         Organized by: <strong>{tour.organizer}</strong>
//       </p>

//       {tour.cover_image && (
//         <img
//           src={tour.cover_image}
//           alt={tour.title}
//           className="w-full h-72 object-cover rounded mb-6 shadow"
//         />
//       )}

//       <nav className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
//         {["overview", "participants", "guides", "offers"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 -mb-px border-b-2 font-semibold ${
//               activeTab === tab
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600"
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </nav>

//       {activeTab === "overview" && (
//         <>
//           {canEdit && !isEditing && (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Edit Overview
//             </button>
//           )}

//           <OverviewTab
//             tour={tour}
//             isEditing={isEditing}
//             formData={formData}
//             setFormData={setFormData}
//             saving={saving}
//             error={error}
//             onSave={handleSave}
//             onCancel={handleCancel}
//           />
//         </>
//       )}

//       {activeTab === "participants" && <ParticipantsTab tourId={tour.id} />}
//       {activeTab === "guides" && <GuidesTab tourId={tour.id} userRole={user.role}/>}
//       {activeTab === "offers" && tour && (
//         <OffersTab offers={tour.offers} tourId={tour.id} canEdit={canEdit} />
//       )}
//     </div>
//   );
// }





// ----------- Main TourDetails Component -----------
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GuidesTab, OverviewTab, ParticipantsTab, OffersTab, SimpleTourDetails } from "../../";
import { useAuth } from "../../../../context/AuthContext";
import axiosInstance from "../../../../api/axiosInstance";

export default function TourDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Editing state for admin/organizer ---
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    cost_per_person: "",
    max_participants: "",
    is_custom_group: false,
    start_date: "",
    end_date: "",
    start_location: "",
    end_location: "",
  });

  // ---------- Fetch tour details ----------
  useEffect(() => {
    async function fetchTour() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/tours/${id}/`);
        setTour(res.data);
        console.log("res.data");
        console.log(res.data);
        setFormData({
          description: res.data.description || "",
          category: res.data.category || "",
          cost_per_person: res.data.cost_per_person ?? "",
          max_participants: res.data.max_participants ?? "",
          is_custom_group: res.data.is_custom_group || false,
          start_date: res.data.start_date ? res.data.start_date.substring(0, 10) : "",
          end_date: res.data.end_date ? res.data.end_date.substring(0, 10) : "",
          start_location: res.data.start_location || "",
          end_location: res.data.end_location || "",
        });
      } catch (err) {
        console.error("Failed to fetch tour details:", err);
        setError("Failed to load tour details.");
      } finally {
        setLoading(false);
      }
    }
    fetchTour();
  }, [id]);

  const canEdit =
    user.role === "admin" || (user.role === "organizer" && tour?.organizer === user.email);

  // ---------- Save edited tour ----------
  async function handleSave() {
    setError(null);
    setSaving(true);
    if (!formData.category.trim()) {
      setError("Category is required.");
      setSaving(false);
      return;
    }
    if (!formData.start_date || !formData.end_date) {
      setError("Start and end dates are required.");
      setSaving(false);
      return;
    }

    try {
      const res = await axiosInstance.patch(`/tours/${id}/`, {
        description: formData.description,
        category: formData.category,
        cost_per_person: parseFloat(formData.cost_per_person),
        max_participants: parseInt(formData.max_participants, 10),
        is_custom_group: formData.is_custom_group,
        start_date: formData.start_date,
        end_date: formData.end_date,
        start_location: formData.start_location,
        end_location: formData.end_location,
      });
      setTour(res.data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save changes.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (tour) {
      setFormData({
        description: tour.description || "",
        category: tour.category || "",
        cost_per_person: tour.cost_per_person ?? "",
        max_participants: tour.max_participants ?? "",
        is_custom_group: tour.is_custom_group || false,
        start_date: tour.start_date ? tour.start_date.substring(0, 10) : "",
        end_date: tour.end_date ? tour.end_date.substring(0, 10) : "",
        start_location: tour.start_location || "",
        end_location: tour.end_location || "",
      });
    }
    setError(null);
    setIsEditing(false);
  }

  // ---------- Loading state ----------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6 animate-pulse">
        <div className="bg-gray-300 dark:bg-gray-700 rounded h-8 w-64" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded h-5 w-40" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded h-64" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-red-600">
        {error || "Tour not found"}
      </div>
    );
  }

  // ---------- Role-based rendering ----------

  // ---------- Guide Simple layout ----------
  if (!canEdit) {
    return <SimpleTourDetails tour={tour} guides={tour.guides} offers={tour.offers}/>;
  }

  // ---------- Admin/Organizer full tab-based layout ----------
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow-md">
      <Link
        to={
          user.role === "admin"
            ? "/dashboard/admin/tours"
            : "/dashboard/organizer/tours"
        }
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back
      </Link>

      <h1 className="text-3xl font-bold mb-1 dark:text-white">{tour.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Organized by: <strong>{tour.organizer}</strong>
      </p>

      {tour.cover_image && (
        <img
          src={tour.cover_image}
          alt={tour.title}
          className="w-full h-72 object-cover rounded mb-6 shadow"
        />
      )}

      {/* Tabs */}
         <nav className="flex border-b border-gray-300 dark:border-gray-700 mb-6 justify-between md:justify-normal">
          {["overview", "participants", "guides", "offers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 md:px-4 py-2 -mb-px border-b-2 font-normal md:font-semibold ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

      {activeTab === "overview" && (
        <>
          {canEdit && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Overview
            </button>
          )}
          <OverviewTab
            tour={tour}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
            saving={saving}
            error={error}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </>
      )}
      {activeTab === "participants" && <ParticipantsTab tourId={tour.id} />}
      {activeTab === "guides" && <GuidesTab tourId={tour.id} userRole={user.role} />}
      {activeTab === "offers" && <OffersTab offers={tour.offers} tourId={tour.id} canEdit={canEdit} />}
    </div>
  );
}
