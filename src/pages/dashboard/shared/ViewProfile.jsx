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
          {
            profile_picture ?
            (
              <img
              src={profile_picture}
              alt="Profile"
              loading="lazy"
              className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-800 object-cover shadow-lg"
              />
            ):(<FiUser className="bg-white dark:bg-slate-800 text-gray-300 dark:text-white-900 bg: text-3xl w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-700 object-cover shadow-lg" />)

          }
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