// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import  axiosInstance  from "../../../api/axiosInstance";
// import { Skeleton } from "@mui/material";

// export default function ViewProfile() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
  

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await axiosInstance.get("/accounts/profile/");
//         // console.log("Fetched user profile:", res.data);
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Failed to load profile", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 max-w-3xl mx-auto">
//         <Skeleton variant="rectangular" height={200} className="mb-4" />
//         <Skeleton variant="text" width="60%" />
//         <Skeleton variant="text" width="40%" />
//         <Skeleton variant="text" width="80%" />
//       </div>
//     );
//   }

//   if (!profile) return <p className="text-center text-red-500">Failed to load profile.</p>;

//   const profilePath = `/dashboard/${user?.role || "tourist"}/profile`;
//   const editProfilePath = `${profilePath}/edit`;

//   // Role-specific data
//   const { role, organized_tours, joined_tours, guided_tours, guide } = profile;

//   return (
//     <div className="p-6 max-w-3xl mx-auto rounded-xl shadow-lg bg-white dark:bg-slate-800 dark:text-white">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
//         <img
//           src={profile.profile_picture}
//           alt="Profile"
//           className="w-24 h-24 rounded-full border-2 border-gray-300"
//         />
//         <div className="max-w-xs min-w-0 text-start md:text-left">
//           <h2 className="md:text-2xl font-bold truncate">{profile.email}</h2>
//           <p>Role: {role}</p>
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div className="space-y-3">
//         <p><strong>Contact:</strong> {profile.contact_number || "Not Provided"}</p>
//         <p><strong>Location:</strong> {profile.location || "Not Provided"}</p>
//         <p><strong>Bio:</strong> {profile.bio || "No bio yet."}</p>
//       </div>

//       {/* Guide-specific info */}
//       {role === "guide" && guide && (
//         <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
//           <h3 className="font-semibold mb-2">Guide Profile</h3>
//           <p><strong>Contact:</strong> {guide.contact_number || "Not Provided"}</p>
//           <p><strong>Bio:</strong> {guide.bio || "No bio yet."}</p>
//         </div>
//       )}

//       {/* Role-based tours */}
//       <div className="mt-6 space-y-6">
//         {role === "organizer" && organized_tours?.length > 0 && (
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Organized Tours</h3>
//             <ul className="list-disc ml-6 space-y-1">
//               {organized_tours.map((tour) => (
//                 <li key={tour.id}>{tour.title} ({tour.start_date} → {tour.end_date})</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {role === "tourist" && joined_tours?.length > 0 && (
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Joined Tours</h3>
//             <ul className="list-disc ml-6 space-y-1">
//               {joined_tours.map((tour) => (
//                 <li key={tour.id}>{tour.title} ({tour.start_date} → {tour.end_date})</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {role === "guide" && guided_tours?.length > 0 && (
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Guided Tours</h3>
//             <ul className="list-disc ml-6 space-y-1">
//               {guided_tours.map((tour) => (
//                 <li key={tour.id}>{tour.title} ({tour.start_date} → {tour.end_date})</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Edit Profile Button */}
//       <div className="mt-6">
//         <button
//           onClick={() => navigate(editProfilePath)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Skeleton, Divider } from "@mui/material";
// import { FiEdit3, FiMapPin, FiPhone, FiMail, FiUser } from "react-icons/fi";
// import api from "./../../../api/axiosInstance"
// export default function ViewProfile() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await api.get("/accounts/profile/");
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Failed to load profile", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto space-y-4">
//         <Skeleton variant="circular" width={100} height={100} />
//         <Skeleton variant="rectangular" height={300} className="rounded-xl" />
//       </div>
//     );
//   }

//   if (!profile) return <p className="text-center text-red-500 py-10">Failed to load profile.</p>;

//   const { role, organized_tours, joined_tours, guided_tours, guide } = profile;
//   const profilePath = `/dashboard/${user?.role || "tourist"}/profile`;
//   const editProfilePath = `${profilePath}/edit`;

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      
//       {/* --- Header Section --- */}
//       <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
//         <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700" />
//         <div className="px-6 pb-6">
//           <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-4">
//             <img
//               src={profile.profile_picture || "https://via.placeholder.com/150"}
//               alt="Profile"
//               className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-800 object-cover shadow-lg"
//             />
//             <div className="flex-1 pb-2">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                 {profile.first_name ? `${profile.first_name} ${profile.last_name}` : profile.email.split('@')[0]}
//                 <span className="text-xs uppercase px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
//                   {role}
//                 </span>
//               </h2>
//               <p className="text-gray-500 dark:text-slate-400 flex items-center gap-1">
//                 <FiMail className="inline" /> {profile.email}
//               </p>
//             </div>
//             <button
//               onClick={() => navigate(editProfilePath)}
//               className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95 mb-2"
//             >
//               <FiEdit3 /> Edit Profile
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* --- Left Column: Info --- */}
//         <div className="md:col-span-1 space-y-6">
//           <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700">
//             <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
//               <FiUser className="text-blue-500" /> Details
//             </h3>
//             <div className="space-y-4 text-sm">
//               <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
//                 <FiPhone className="text-gray-400" />
//                 <span>{profile.contact_number || "No phone"}</span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
//                 <FiMapPin className="text-gray-400" />
//                 <span>{profile.location || "No location"}</span>
//               </div>
//             </div>
//             <Divider className="my-8 dark:bg-slate-700" />
//             <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Bio</h4>
//             <p className="text-sm text-gray-600 dark:text-slate-300 italic">
//               "{profile.bio || "No bio yet."}"
//             </p>
//           </div>

//           {/* Guide Specific Badge */}
//           {role === "guide" && guide && (
//             <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30">
//               <h3 className="text-amber-800 dark:text-amber-400 font-bold mb-2">Verified Guide</h3>
//               <p className="text-sm text-amber-700/80 dark:text-amber-500/80">
//                 Specialized in regional tours and safety-first expeditions.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* --- Right Column: Activity --- */}
//         <div className="md:col-span-2 space-y-6">
//           <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700">
//             <h3 className="text-xl font-bold mb-6 dark:text-white">
//               {role === "organizer" ? "Organized Expeditions" : 
//                role === "guide" ? "Guided Assignments" : "Journey History"}
//             </h3>

//             <div className="space-y-4">
//               {/* Common mapping logic for tours */}
//               {(() => {
//                 const tours = role === "organizer" ? organized_tours : 
//                              role === "guide" ? guided_tours : joined_tours;

//                 if (!tours || tours.length === 0) {
//                   return (
//                     <div className="text-center py-10 text-gray-400 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700">
//                       No tours found in your record.
//                     </div>
//                   );
//                 }

//                 return tours.map((tour) => (
//                   <div 
//                     key={tour.id} 
//                     className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/40 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
//                   >
//                     <div>
//                       <h4 className="font-bold text-gray-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
//                         {tour.title}
//                       </h4>
//                       <p className="text-xs text-gray-500 dark:text-slate-400">
//                         {tour.start_date} — {tour.end_date}
//                       </p>
//                     </div>
//                     <span className="text-xs font-semibold px-3 py-1 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">
//                       Details
//                     </span>
//                   </div>
//                 ));
//               })()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { Skeleton, Divider } from "@mui/material";
import { FiEdit3, FiMapPin, FiPhone, FiMail, FiUser } from "react-icons/fi";

// --- Memoized TourCard ---
const TourCard = React.memo(({ tour }) => (
  <div className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/40 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
    <div>
      <h4 className="font-bold text-gray-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
        {tour.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-slate-400">
        {tour.start_date} — {tour.end_date}
      </p>
    </div>
    <span className="text-xs font-semibold px-3 py-1 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">
      Details
    </span>
  </div>
));

// --- Profile Header ---
const ProfileHeader = React.memo(({ profile, editProfilePath }) => {
  const navigate = useNavigate();
  const { profile_picture, first_name, last_name, email, role } = profile;

  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700" />
      <div className="px-6 pb-6">
        <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-4">
          <img
            src={profile_picture || "https://www.pngkey.com/png/detail/349-3499617_person-placeholder-person-placeholder.png"}
            alt="Profile"
            loading="lazy"
            className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-800 object-cover shadow-lg"
          />
          <div className="flex-1 pb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {first_name ? `${first_name} ${last_name}` : email.split("@")[0]}
              <span className="text-xs uppercase px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                {role}
              </span>
            </h2>
            <p className="text-gray-500 dark:text-slate-400 flex items-center gap-1">
              <FiMail className="inline" /> {email}
            </p>
          </div>
          <button
            onClick={() => navigate(editProfilePath)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95 mb-2"
          >
            <FiEdit3 /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
});

// --- Profile Details ---
const ProfileDetails = React.memo(({ profile }) => {
  const { contact_number, location, bio, role, guide } = profile;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
          <FiUser className="text-blue-500" /> Details
        </h3>
        <div className="space-y-4 text-sm mb-2">
          <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
            <FiPhone className="text-gray-400" />
            <span>{contact_number || "No phone"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
            <FiMapPin className="text-gray-400" />
            <span>{location || "No location"}</span>
          </div>
        </div>
        <Divider className="my-4 dark:bg-slate-700" />
        <h4 className="text-xs font-bold uppercase text-gray-400 my-2">Bio</h4>
        <p className="text-sm text-gray-600 dark:text-slate-300">
          "{bio || "No bio yet."}"
        </p>
      </div>

      {role === "guide" && guide && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30">
          <h3 className="text-amber-800 dark:text-amber-400 font-bold mb-2">Verified Guide</h3>
          <p className="text-sm text-amber-700/80 dark:text-amber-500/80">
            Specialized in regional tours and safety-first expeditions.
          </p>
        </div>
      )}
    </div>
  );
});

// --- Tour List ---
const TourList = React.memo(({ profile }) => {
  const tours = useMemo(() => {
    if (!profile) return [];
    return profile.role === "organizer"
      ? profile.organized_tours
      : profile.role === "guide"
      ? profile.guided_tours
      : profile.joined_tours;
  }, [profile]);

  const tourLabel = useMemo(() => {
    if (!profile) return "";
    switch (profile.role) {
      case "organizer":
        return "Organized Expeditions";
      case "guide":
        return "Guided Assignments";
      default:
        return "Journey History";
    }
  }, [profile]);

  if (!tours || tours.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700">
        No tours found in your record.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
});

// --- Main ViewProfile ---
export default function ViewProfile() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(user?.profile || null);
  const [loading, setLoading] = useState(!profile);

  const profilePath = `/dashboard/${user?.role || "tourist"}/profile`;
  const editProfilePath = `${profilePath}/edit`;

  // Fetch profile only if not cached
  useEffect(() => {
    if (profile) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/accounts/profile/");
        setProfile(res.data);
        setUser((prev) => ({ ...prev, profile: res.data }));
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profile, setUser]);

  if (loading) return <SkeletonLoader />;

  if (!profile) return <p className="text-center text-red-500 py-10">Failed to load profile.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <ProfileHeader profile={profile} editProfilePath={editProfilePath} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileDetails profile={profile} />
        </div>
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-6 dark:text-white">
              {profile.role === "organizer" ? "Organized Expeditions" : profile.role === "guide" ? "Guided Assignments" : "Journey History"}
            </h3>
            <TourList profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Skeleton Loader Component ---
const SkeletonLoader = () => (
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="h-32 bg-gray-200 dark:bg-slate-700 animate-pulse" />
        <div className="px-6 pb-6">
          <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-4">
            <Skeleton 
              variant="rectangular" 
              width={128} 
              height={128} 
              className="rounded-2xl border-4 border-white dark:border-slate-800 dark:bg-slate-700 shadow-lg" 
            />
            <div className="flex-1 pb-2 space-y-2">
              <Skeleton variant="text" width="40%" height={32} className="dark:bg-slate-700" />
              <Skeleton variant="text" width="25%" height={20} className="dark:bg-slate-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700 space-y-4">
            <Skeleton variant="text" width="60%" height={28} className="dark:bg-slate-700" />
            <div className="space-y-3">
              <Skeleton variant="text" width="80%" className="dark:bg-slate-700" />
              <Skeleton variant="text" width="70%" className="dark:bg-slate-700" />
            </div>
            <Divider className="dark:bg-slate-700" />
            <Skeleton variant="text" width="30%" className="dark:bg-slate-700" />
            <Skeleton variant="rectangular" height={60} className="rounded-xl dark:bg-slate-700" />
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700">
            <Skeleton variant="text" width="40%" height={32} className="mb-6 dark:bg-slate-700" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-slate-900/40 rounded-2xl flex justify-between items-center">
                  <div className="space-y-2 w-full">
                    <Skeleton variant="text" width="50%" className="dark:bg-slate-700" />
                    <Skeleton variant="text" width="30%" className="dark:bg-slate-700" />
                  </div>
                  <Skeleton variant="circular" width={40} height={24} className="rounded-full dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

);