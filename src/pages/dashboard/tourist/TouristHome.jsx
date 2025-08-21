// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../../context/authAPI";
// import { useAuth } from "../../../context/AuthContext";
// import { motion } from "framer-motion";
// import { useTheme } from "@emotion/react";

// export default function TouristHome() {
//   const { user } = useAuth();
//   const [upcomingTours, setUpcomingTours] = useState([]);
//   const [pastTours, setPastTours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { theme } = useTheme()

//   const fetchTours = async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       const { data } = await axiosInstance.get("/tours/participants/my-tours");
//       console.log("my tours");
//       console.log(data);
//       const now = new Date();
//       setUpcomingTours(data.filter((tour) => new Date(tour.start_date) >= now));
//       setPastTours(data.filter((tour) => new Date(tour.start_date) < now));
//     } catch (error) {
//       console.error("Error fetching participant tours:", error);
//     } finally {
//       setLoading(false) ;
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, [user]);

//   const handleRequestJoin = async (tourId) => {
//     try {
//       await axiosInstance.post("/tours/participants", { tour: tourId });
//       fetchTours();
//     } catch (error) {
//       console.error("Error requesting to join tour:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-lg text-gray-500">Loading your tours...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 md:px-12 min-h-screen gap-y-24 -mt-28 py-6">
//       {/* Hero Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-10 shadow-lg my-12"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">
//           Welcome back, {user?.first_name || "Traveler"} 👋
//         </h1>
//         <p className="text-lg opacity-90">Here are your upcoming and past tours.</p>
//       </motion.div>

//       {/* Upcoming Tours */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-6">Upcoming Tours</h2>
//         {upcomingTours.length === 0 ? (
//           <p className="text-gray-500">No upcoming tours yet.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {upcomingTours.map((tour) => (
//               <motion.div
//                 key={tour.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="rounded-2xl shadow hover:shadow-lg transition p-5  bg-white dark:bg-gray-700"
//               >
//                 <img
//                   src={tour.cover_image}
//                   alt={tour.title}
//                   className="w-full h-40 object-cover rounded-xl mb-4"
//                 />
//                 <h3 className="text-lg font-bold">{tour.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   {new Date(tour.start_date).toLocaleDateString()} -{" "}
//                   {new Date(tour.end_date).toLocaleDateString()}
//                 </p>
//                 <p className="mt-2 text-sm">{tour.location}</p>

//                 {tour.my_status === "approved" ? (
//                   <span className="mt-4 inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
//                     Accepted
//                   </span>
//                 ) : tour.my_status === "pending" ? (
//                   <span className="mt-4 inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600">
//                     Pending Approval
//                   </span>
//                 ) : (
//                   <button
//                     onClick={() => handleRequestJoin(tour.id)}
//                     className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
//                   >
//                     Request to Join
//                   </button>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Past Tours */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-6">Past Tours</h2>
//         {pastTours.length === 0 ? (
//           <p className="text-gray-500">No past tours yet.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {pastTours.map((tour) => (
//               <motion.div
//                 key={tour.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 bg-white dark:bg-gray-700"
//               >
//                 <img
//                   src={tour.cover_image}
//                   alt={tour.title}
//                   className="w-full h-40 object-cover rounded-xl mb-4"
//                 />
//                 <h3 className="text-lg font-bold">{tour.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   {new Date(tour.start_date).toLocaleDateString()} -{" "}
//                   {new Date(tour.end_date).toLocaleDateString()}
//                 </p>
//                 <p className="mt-2 text-sm">{tour.location}</p>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../../context/authAPI";
// import { useAuth } from "../../../context/AuthContext";
// import { motion } from "framer-motion";
// import { useTheme } from "@emotion/react";

// export default function TouristHome() {
//   const { user } = useAuth();
//   const [upcomingTours, setUpcomingTours] = useState([]);
//   const [pastTours, setPastTours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { theme } = useTheme();

//   const fetchTours = async () => {
//     if (!user) return;
//     try {
//       setLoading(true);

//       // Fetch profile which contains joined_tours
//       const { data: profile } = await axiosInstance.get("/accounts/profile/");
//       console.log("profile");
//       console.log(profile);
//       const now = new Date();

//       // Split joined tours into upcoming and past
//       setUpcomingTours(
//         profile.joined_tours.filter((t) => new Date(t.start_date) >= now)
//       );
//       setPastTours(
//         profile.joined_tours.filter((t) => new Date(t.start_date) < now)
//       );
//     } catch (error) {
//       console.error("Error fetching participant tours:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, [user]);

//   const handleRequestJoin = async (tourId) => {
//     try {
//       await axiosInstance.post("/tours/participants/", { tour: tourId });
//       fetchTours(); // refresh after requesting
//     } catch (error) {
//       console.error("Error requesting to join tour:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-lg text-gray-500">Loading your tours...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 md:px-12 min-h-screen gap-y-24 -mt-28 py-6">
//       {/* Hero Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-10 shadow-lg my-12"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">
//           Welcome back, {user?.first_name || "Traveler"} 👋
//         </h1>
//         <p className="text-lg opacity-90">Here are your upcoming and past tours.</p>
//       </motion.div>

//       {/* Upcoming Tours */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-6">Upcoming Tours</h2>
//         {upcomingTours.length === 0 ? (
//           <p className="text-gray-500">No upcoming tours yet.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {upcomingTours.map((tour) => (
//               <motion.div
//                 key={tour.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="rounded-2xl shadow hover:shadow-lg transition p-5 bg-white dark:bg-gray-700"
//               >
//                 <img
//                   src={tour.cover_image || "https://via.placeholder.com/400x200"}
//                   alt={tour.title}
//                   className="w-full h-40 object-cover rounded-xl mb-4"
//                 />
//                 <h3 className="text-lg font-bold">{tour.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   {new Date(tour.start_date).toLocaleDateString()} -{" "}
//                   {new Date(tour.end_date).toLocaleDateString()}
//                 </p>
//                 <p className="mt-2 text-sm">{tour.location}</p>

//                 {tour.status === "approved" ? (
//                   <span className="mt-4 inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
//                     Accepted
//                   </span>
//                 ) : tour.status === "pending" ? (
//                   <span className="mt-4 inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600">
//                     Pending Approval
//                   </span>
//                 ) : (
//                   <button
//                     onClick={() => handleRequestJoin(tour.id)}
//                     className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
//                   >
//                     Request to Join
//                   </button>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Past Tours */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-6">Past Tours</h2>
//         {pastTours.length === 0 ? (
//           <p className="text-gray-500">No past tours yet.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {pastTours.map((tour) => (
//               <motion.div
//                 key={tour.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="rounded-2xl shadow hover:shadow-lg transition p-5 bg-white dark:bg-gray-700"
//               >
//                 <img
//                   src={tour.cover_image || "https://via.placeholder.com/400x200"}
//                   alt={tour.title}
//                   className="w-full h-40 object-cover rounded-xl mb-4"
//                 />
//                 <h3 className="text-lg font-bold">{tour.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   {new Date(tour.start_date).toLocaleDateString()} -{" "}
//                   {new Date(tour.end_date).toLocaleDateString()}
//                 </p>
//                 <p className="mt-2 text-sm">{tour.location}</p>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../../context/authAPI";
// import { useAuth } from "../../../context/AuthContext";
// import { motion } from "framer-motion";
// import { useNavigate } from 'react-router-dom';
// import TourCard from "../components/TourCard";

// export default function TouristHome() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [availableTours, setAvailableTours] = useState([]);
//   const [pendingTours, setPendingTours] = useState([]);
//   const [activeTours, setActiveTours] = useState([]);
//   const [pastTours, setPastTours] = useState([]);

//   const fetchTours = async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       const { data } = await axiosInstance.get("/tours/my-tours/");
      
//       setAvailableTours(data.available_tours || []);
//       setPendingTours(data.pending_tours || []);
//       setActiveTours(data.active_tours || []);
//       setPastTours(data.past_tours || []);
//     } catch (error) {
//       console.error("Error fetching tours:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, [user]);

//   const handleRequestJoin = async (tourId) => {
//     try {
//       await axiosInstance.post("/tours/participants/", { tour: tourId });
//       fetchTours(); // refresh after requesting
//     } catch (error) {
//       console.error("Error requesting to join tour:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-lg text-gray-500">Loading your tours...</p>
//       </div>
//     );
//   }

//   const renderTourCard = (tour) => (
//     <motion.div
//       key={tour.id}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-2xl shadow hover:shadow-lg transition p-5 bg-white dark:bg-gray-700"
//     >
//       <img
//         src={tour.cover_image || "https://via.placeholder.com/400x200"}
//         alt={tour.title}
//         className="w-full h-40 object-cover rounded-xl mb-4"
//       />
//       <h3 className="text-lg font-bold">{tour.title}</h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300">
//         {new Date(tour.start_date).toLocaleDateString()} -{" "}
//         {new Date(tour.end_date).toLocaleDateString()}
//       </p>
//       <p className="mt-2 text-sm">{tour.start_location}</p>

//       {tour.status === "approved" && (
//         <>
//         <span className="mt-4 inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
//           Accepted
//         </span>
//         <button
//           onClick={() => navigate(`events/${tour.id}`)}
//           className="mt-4 w-full bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-xl transition"
//         >
//           View Details
//         </button>
//         </>
       
        
//       )}
//       {tour.status === "pending" && (
//         <span className="mt-4 inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600">
//           Pending Approval
//         </span>
//       )}
//       {tour.status === "completed" && (
//         <span className="mt-4 inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
//           Completed
//         </span>
//       )}
//       {!tour.status && (
//         <button
//           onClick={() => handleRequestJoin(tour.id)}
//           className="mt-4 w-full bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-xl transition"
//         >
//           Request to Join
//         </button>
//       )}
//     </motion.div>
//   );

//   return (
//     <div className="px-4 md:px-12 min-h-screen gap-y-24 -mt-28 py-6">
//       {/* Hero Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-10 shadow-lg my-12"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">
//           Welcome back, {user?.first_name || "Traveler"} 👋
//         </h1>
//         <p className="text-lg opacity-90">
//           Browse available tours or check your joined tours.
//         </p>
//       </motion.div>

//       Available Tours
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-6">Available Tours</h2>
//         {availableTours.length === 0 ? (
//           <p className="text-gray-500">No new tours available.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {availableTours.map(renderTourCard)}
//           </div>
//         )}
//       </section>
//       {/* Available Tours */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Available Tours</h2>
//           {availableTours.length === 0 ? (
//             <p className="text-gray-500">No new tours available.</p>
//           ) : (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {availableTours.map(tour => (
//                 <TourCard key={tour.id} tour={tour} showDetailButton={!tour.status} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Pending Tours */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Pending Tours</h2>
//           {pendingTours.length === 0 ? (
//             <p className="text-gray-500">No pending requests.</p>
//           ) : (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {pendingTours.map(tour => (
//                 <TourCard key={tour.id} tour={tour} showDetailButton={tour.status === "approved"} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Active Tours */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Your Active Tours</h2>
//           {activeTours.length === 0 ? (
//             <p className="text-gray-500">No active tours currently.</p>
//           ) : (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {activeTours.map(tour => (
//                 <TourCard key={tour.id} tour={tour} showDetailButton={true} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Past Tours */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-6">Past Tours</h2>
//           {pastTours.length === 0 ? (
//             <p className="text-gray-500">No past tours yet.</p>
//           ) : (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//              {pastTours.map(tour => (
//                 <TourCard key={tour.id} tour={tour} showDetailButton={true} />
//               ))}
//             </div>
//           )}
//         </section>
//     </div>
//   );
// }


// src/pages/dashboard/tourist/TouristHome.jsx
// src/pages/dashboard/tourist/TouristHome.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../../../context/AuthContext";
// import { axiosInstance } from "../../../context/authAPI";
// import TourCard from "../components/TourCard";

// export default function TouristHome() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const [availableTours, setAvailableTours] = useState([]);
//   const [pendingTours, setPendingTours] = useState([]);
//   const [activeTours, setActiveTours] = useState([]);
//   const [pastTours, setPastTours] = useState([]);

//   // Section visibility
//   const [visibleSections, setVisibleSections] = useState({
//     available: true,
//     pending: true,
//     active: true,
//     past: true,
//   });

//   // Layout: grid or list
//   const [layout, setLayout] = useState("grid");

//   const fetchTours = async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       const { data } = await axiosInstance.get("/tours/my-tours/");
//       setAvailableTours(data.available_tours || []);
//       setPendingTours(data.pending_tours || []);
//       setActiveTours(data.active_tours || []);
//       setPastTours(data.past_tours || []);
//     } catch (error) {
//       console.error("Error fetching tours:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, [user]);

//   const handleRequestJoin = async (tourId) => {
//     try {
//       await axiosInstance.post("/tours/participants/", { tour: tourId });
//       fetchTours();
//     } catch (error) {
//       console.error("Error requesting to join tour:", error);
//     }
//   };

//   const toggleSection = (section) => {
//     setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-lg text-gray-500">Loading your tours...</p>
//       </div>
//     );
//   }

//   const sectionClass = layout === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4";

//   const renderTourCard = (tour) => (
//     <TourCard
//       key={tour.id}
//       tour={tour}
//       showDetailButton={tour.status === "approved" || tour.status === "completed"}
//       onRequestJoin={() => handleRequestJoin(tour.id)}
//       layout={layout}
//     />
//   );

//   return (
//     <div className="px-4 md:px-12 min-h-screen py-6">
//       {/* Hero */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-6 shadow-lg"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">
//           Welcome back, {user?.first_name || "Traveler"} 👋
//         </h1>
//         <p className="text-lg opacity-90">
//           Browse available tours or check your joined tours.
//         </p>
//       </motion.div>

//       {/* Section toggles */}
//       <div className="flex gap-2 flex-wrap mb-4">
//         {["available", "pending", "active", "past"].map((sec) => (
//           <button
//             key={sec}
//             onClick={() => toggleSection(sec)}
//             className={`px-4 py-2 rounded-xl ${
//               visibleSections[sec] ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-600"
//             }`}
//           >
//             {sec.charAt(0).toUpperCase() + sec.slice(1)} Tours
//           </button>
//         ))}
//       </div>

//       {/* Layout toggle */}
//       <div className="flex gap-2 mb-6">
//         <button
//           onClick={() => setLayout("grid")}
//           className={`px-4 py-2 rounded-xl ${layout === "grid" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-600"}`}
//         >
//           Grid
//         </button>
//         <button
//           onClick={() => setLayout("list")}
//           className={`px-4 py-2 rounded-xl ${layout === "list" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-600"}`}
//         >
//           List
//         </button>
//       </div>

//       {/* Sections */}
//       {visibleSections.available && (
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Available Tours</h2>
//           {availableTours.length === 0 ? (
//             <p className="text-gray-500">No new tours available.</p>
//           ) : (
//             <div className={sectionClass}>
//               {availableTours.map(renderTourCard)}
//             </div>
//           )}
//         </section>
//       )}

//       {visibleSections.pending && (
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Pending Tours</h2>
//           {pendingTours.length === 0 ? (
//             <p className="text-gray-500">No pending requests.</p>
//           ) : (
//             <div className={sectionClass}>
//               {pendingTours.map(renderTourCard)}
//             </div>
//           )}
//         </section>
//       )}

//       {visibleSections.active && (
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Active Tours</h2>
//           {activeTours.length === 0 ? (
//             <p className="text-gray-500">No active tours currently.</p>
//           ) : (
//             <div className={sectionClass}>
//               {activeTours.map(renderTourCard)}
//             </div>
//           )}
//         </section>
//       )}

//       {visibleSections.past && (
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Past Tours</h2>
//           {pastTours.length === 0 ? (
//             <p className="text-gray-500">No past tours yet.</p>
//           ) : (
//             <div className={sectionClass}>
//               {pastTours.map(renderTourCard)}
//             </div>
//           )}
//         </section>
//       )}
//     </div>
//   );
// }

// // src/pages/dashboard/tourist/TouristHome.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../../../context/AuthContext";
// import { axiosInstance } from "../../../context/authAPI";
// import TourCard from "../components/TourCard";

// export default function TouristHome() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);

//   const [availableTours, setAvailableTours] = useState([]);
//   const [pendingTours, setPendingTours] = useState([]);
//   const [activeTours, setActiveTours] = useState([]);
//   const [pastTours, setPastTours] = useState([]);

//   // Section visibility (accordion)
//   const [sections, setSections] = useState({
//     available: true,
//     pending: true,
//     active: true,
//     past: true,
//   });

//   // Layout preference (grid/list/compact)
//   const [layout, setLayout] = useState(
//     localStorage.getItem("tourLayout") || "grid"
//   );

//   useEffect(() => {
//     localStorage.setItem("tourLayout", layout);
//   }, [layout]);

//   const fetchTours = async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       const { data } = await axiosInstance.get("/tours/my-tours/");
//       setAvailableTours(data.available_tours || []);
//       setPendingTours(data.pending_tours || []);
//       setActiveTours(data.active_tours || []);
//       setPastTours(data.past_tours || []);
//     } catch (err) {
//       console.error("Error fetching tours:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, [user]);

//   const handleRequestJoin = async (tourId) => {
//     try {
//       await axiosInstance.post("/tours/participants/", { tour: tourId });
//       fetchTours();
//     } catch (err) {
//       console.error("Error requesting to join tour:", err);
//     }
//   };

//   const toggleSection = (section) => {
//     setSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-lg text-gray-500">Loading your tours...</p>
//       </div>
//     );
//   }

//   const sectionClass =
//     layout === "grid"
//       ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       : "flex flex-col gap-4";

//   const renderTourCard = (tour) => (
//     <TourCard
//       key={tour.id}
//       tour={tour}
//       showDetailButton={tour.status === "approved" || tour.status === "completed"}
//       onRequestJoin={() => handleRequestJoin(tour.id)}
//       layout={layout}
//     />
//   );

//   const sectionsData = [
//     { key: "available", label: "Available Tours", data: availableTours },
//     { key: "pending", label: "Pending Tours", data: pendingTours },
//     { key: "active", label: "Active Tours", data: activeTours },
//     { key: "past", label: "Past Tours", data: pastTours },
//   ];

//   return (
//     <div className="px-4 md:px-12 min-h-screen py-6">
//       {/* Hero */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-6 shadow-lg"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">
//           Welcome back, {user?.first_name || "Traveler"} 👋
//         </h1>
//         <p className="text-lg opacity-90">
//           Browse available tours or check your joined tours.
//         </p>
//       </motion.div>

//       {/* Layout toggle */}
//       <div className="flex gap-2 mb-6">
//         {["grid", "list", "compact"].map((l) => (
//           <button
//             key={l}
//             onClick={() => setLayout(l)}
//             className={`px-4 py-2 rounded-xl ${
//               layout === l ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-600"
//             }`}
//           >
//             {l.charAt(0).toUpperCase() + l.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Sections */}
//       {sectionsData.map((sec) => (
//         <div key={sec.key} className="mb-6">
//           <button
//             onClick={() => toggleSection(sec.key)}
//             className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl mb-2"
//           >
//             <span className="font-semibold">{sec.label}</span>
//             <span>{sections[sec.key] ? "▲" : "▼"}</span>
//           </button>
//           {sections[sec.key] && (
//             <div className={sectionClass}>
//               {sec.data.length === 0 ? (
//                 <p className="text-gray-500 ml-2">No tours in this section.</p>
//               ) : (
//                 sec.data.map(renderTourCard)
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


// // src/pages/dashboard/tourist/TouristHome.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../../../context/AuthContext";
// import { axiosInstance } from "../../../context/authAPI";
// import TourCard from "../components/TourCard";

// export default function TouristHome() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);

//   const [availableTours, setAvailableTours] = useState([]);
//   const [pendingTours, setPendingTours] = useState([]);
//   const [activeTours, setActiveTours] = useState([]);
//   const [pastTours, setPastTours] = useState([]);

//   // Section visibility (accordion)
//   const [sections, setSections] = useState({
//     available: true,
//     pending: true,
//     active: true,
//     past: true,
//   });

//   // Layout preference (grid/list/compact)
//   const [layout, setLayout] = useState(
//     localStorage.getItem("tourLayout") || "compact"
//   );

//   useEffect(() => {
//     localStorage.setItem("tourLayout", layout);
//   }, [layout]);

//   const fetchTours = async () => {
//     if (!user) return;
//     try {
//       setLoading(true);
//       const { data } = await axiosInstance.get("/tours/my-tours/");
//       setAvailableTours(data.available_tours || []);
//       setPendingTours(data.pending_tours || []);
//       setActiveTours(data.active_tours || []);
//       setPastTours(data.past_tours || []);
//     } catch (err) {
//       if (err.response) {
//     // Server responded with status code outside 2xx
//     console.error("Server response error:", err.response.status, err.response.data);
//   } else if (err.request) {
//     // No response received
//     console.error("No response received:", err.request);
//   } else {
//     // Something else
//     console.error("Error setting up request:", err.message);
//   }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, [user]);

//   const handleRequestJoin = async (tourId) => {
//     try {
//       await axiosInstance.post("/tours/participants/", { tour: tourId });
//       fetchTours();
//     } catch (err) {
//       console.error("Error requesting to join tour:", err);
//     }
//   };

//   const toggleSection = (section) => {
//     setSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-lg text-gray-500">Loading your tours...</p>
//       </div>
//     );
//   }

//   // Responsive section class
//   const sectionClass =
//     layout === "grid"
//       ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       : layout === "list"
//       ? "flex flex-col gap-4"
//       : layout === "compact"
//       ? "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//       : "";

//   const renderTourCard = (tour) => (
//     <TourCard
//       key={tour.id}
//       tour={tour}
//       showDetailButton={tour.status === "approved" || tour.status === "completed"}
//       onRequestJoin={() => handleRequestJoin(tour.id)}
//       layout={layout}
//     />
//   );

//   const sectionsData = [
//     { key: "available", label: "Available Tours", data: availableTours },
//     { key: "pending", label: "Pending Tours", data: pendingTours },
//     { key: "active", label: "Active Tours", data: activeTours },
//     { key: "past", label: "Past Tours", data: pastTours },
//   ];

//   return (
//     <div className="px-4 md:px-12 min-h-screen py-6">
//       {/* Hero */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-6 shadow-lg"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">
//           Welcome back, {user?.first_name || "Traveler"} 👋
//         </h1>
//         <p className="text-lg opacity-90">
//           Browse available tours or check your joined tours.
//         </p>
//       </motion.div>

//       {/* Layout toggle */}
//       <div className="flex gap-2 mb-6">
//         {["grid", "list", "compact"].map((l) => (
//           <button
//             key={l}
//             onClick={() => setLayout(l)}
//             className={`px-4 py-2 rounded-xl ${
//               layout === l ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-600"
//             }`}
//           >
//             {l.charAt(0).toUpperCase() + l.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Sections */}
//       {sectionsData.map((sec) => (
//         <div key={sec.key} className="mb-6">
//           <button
//             onClick={() => toggleSection(sec.key)}
//             className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl mb-2"
//           >
//             <span className="font-semibold">{sec.label}</span>
//             <span>{sections[sec.key] ? "▲" : "▼"}</span>
//           </button>

//           {sections[sec.key] && (
//             <div className={sectionClass}>
//               {sec.data && sec.data.length > 0 ? (
//                 sec.data.map(renderTourCard)
//               ) : (
//                 <p className="text-gray-500 col-span-full px-4 py-6">
//                   No tours in this section yet.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { axiosInstance } from "../../../context/authAPI";
import TourCard from "../components/TourCard";

export default function TouristHome() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [toursData, setToursData] = useState({
    available: [],
    pending: [],
    active: [],
    past: [],
  });

  const [sections, setSections] = useState({
    available: true,
    pending: true,
    active: true,
    past: true,
  });

  const [layout, setLayout] = useState(
    localStorage.getItem("tourLayout") || "compact"
  );

  useEffect(() => {
    localStorage.setItem("tourLayout", layout);
  }, [layout]);

  const fetchTours = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/tours/my-tours/");
      setToursData({
        available: data.available_tours || [],
        pending: data.pending_tours || [],
        active: data.active_tours || [],
        past: data.past_tours || [],
      });
    } catch (err) {
      console.error("Error fetching tours:", err?.response || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [user]);

  const handleRequestJoin = async (tourId) => {
    try {
      await axiosInstance.post("/tours/participants/", { tour: tourId });
      fetchTours();
    } catch (err) {
      console.error("Error requesting to join tour:", err);
    }
  };

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sectionClass =
    layout === "grid"
      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      : layout === "list"
      ? "flex flex-col gap-4"
      : "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const renderTourCard = (tour) => (
    <TourCard
      key={tour.id}
      tour={tour}
      showDetailButton={tour.status === "approved" || tour.status === "completed"}
      onRequestJoin={() => handleRequestJoin(tour.id)}
      layout={layout}
    />
  );

  const sectionsData = [
    { key: "available", label: "Available Tours" },
    { key: "pending", label: "Pending Tours" },
    { key: "active", label: "Active Tours" },
    { key: "past", label: "Past Tours" },
  ];

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-xl" />
  );

  return (
    <div className="px-4 md:px-12 min-h-screen py-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-6 shadow-lg"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {user?.first_name || "Traveler"} 👋
        </h1>
        <p className="text-lg opacity-90">
          Browse available tours or check your joined tours.
        </p>
      </motion.div>

      {/* Layout toggle */}
      <div className="flex gap-2 mb-6">
        {["grid", "list", "compact"].map((l) => (
          <button
            key={l}
            onClick={() => setLayout(l)}
            className={`px-4 py-2 rounded-xl ${
              layout === l
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>

      {/* Sections */}
      {sectionsData.map((sec) => (
        <div key={sec.key} className="mb-6">
          <button
            onClick={() => toggleSection(sec.key)}
            className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl mb-2"
          >
            <span className="font-semibold">{sec.label}</span>
            <span>{sections[sec.key] ? "▲" : "▼"}</span>
          </button>

          <AnimatePresence initial={false}>
            {sections[sec.key] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={sectionClass}
              >
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                ) : toursData[sec.key] && toursData[sec.key].length > 0 ? (
                  toursData[sec.key].map(renderTourCard)
                ) : (
                  <p className="text-gray-500 col-span-full px-4 py-6">
                    No tours in this section yet.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
