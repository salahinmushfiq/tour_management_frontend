import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import  axiosInstance  from "../../../../api/axiosInstance";
import { Skeleton } from "@mui/material";

export default function ViewProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axiosInstance.get("/accounts/profile/");
        // console.log("Fetched user profile:", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Skeleton variant="rectangular" height={200} className="mb-4" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
      </div>
    );
  }

  if (!profile) return <p className="text-center text-red-500">Failed to load profile.</p>;

  const profilePath = `/dashboard/${user?.role || "tourist"}/profile`;
  const editProfilePath = `${profilePath}/edit`;

  // Role-specific data
  const { role, organized_tours, joined_tours, guided_tours, guide } = profile;

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-xl shadow-lg bg-white dark:bg-slate-800 dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <img
          src={profile.profile_picture}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div className="max-w-xs min-w-0 text-start md:text-left">
          <h2 className="md:text-2xl font-bold truncate">{profile.email}</h2>
          <p>Role: {role}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-3">
        <p><strong>Contact:</strong> {profile.contact_number || "Not Provided"}</p>
        <p><strong>Location:</strong> {profile.location || "Not Provided"}</p>
        <p><strong>Bio:</strong> {profile.bio || "No bio yet."}</p>
      </div>

      {/* Guide-specific info */}
      {role === "guide" && guide && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-semibold mb-2">Guide Profile</h3>
          <p><strong>Contact:</strong> {guide.contact_number || "Not Provided"}</p>
          <p><strong>Bio:</strong> {guide.bio || "No bio yet."}</p>
        </div>
      )}

      {/* Role-based tours */}
      <div className="mt-6 space-y-6">
        {role === "organizer" && organized_tours?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Organized Tours</h3>
            <ul className="list-disc ml-6 space-y-1">
              {organized_tours.map((tour) => (
                <li key={tour.id}>{tour.title} ({tour.start_date} → {tour.end_date})</li>
              ))}
            </ul>
          </div>
        )}

        {role === "tourist" && joined_tours?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Joined Tours</h3>
            <ul className="list-disc ml-6 space-y-1">
              {joined_tours.map((tour) => (
                <li key={tour.id}>{tour.title} ({tour.start_date} → {tour.end_date})</li>
              ))}
            </ul>
          </div>
        )}

        {role === "guide" && guided_tours?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Guided Tours</h3>
            <ul className="list-disc ml-6 space-y-1">
              {guided_tours.map((tour) => (
                <li key={tour.id}>{tour.title} ({tour.start_date} → {tour.end_date})</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate(editProfilePath)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
