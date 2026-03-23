// //EditProfile
// import React, { useEffect, useState } from "react";
// import  axiosInstance  from "../../../api/axiosInstance";
// export default function EditProfile() {
//   const [formData, setFormData] = useState({
//     bio: "",
//     contact_number: "",
//     profile_picture: "",
//     location: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await axiosInstance.get("/accounts/profile/");
//         setFormData({
//           bio: res.data.bio || "",
//           contact_number: res.data.contact_number || "",
//           profile_picture: res.data.profile_picture || "",
//           location: res.data.location || "",
//         });
//       } catch (err) {
//         console.error("Failed to load profile", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await axiosInstance.put("/accounts/profile/", formData);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Failed to update profile", err);
//       alert("Failed to update profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-6">Loading profile...</p>;
//   }

//   return (
//     <div
//       className="p-6 max-w-3xl mx-auto rounded-xl shadow-lg dark:bg-slate-800 dark:text-white bg-white text-black"
//     >
//       <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

//       <form onSubmit={handleSubmit} className="space-y-4 dark:bg-slate-800 dark:text-white bg-white text-black">
//         <div>
//           <label className="block mb-1">Contact Number</label>
//           <input
//             type="text"
//             name="contact_number"
//             value={formData.contact_number}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Profile Picture URL</label>
//           <input
//             type="text"
//             name="profile_picture"
//             value={formData.profile_picture}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Bio</label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleChange}
//             rows={3}
//             className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={saving}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { useAuth } from "../../../context/AuthContext";
import { useUIStore } from "../../../store/useUIStore";
import { Skeleton, Divider } from "@mui/material";
import { FiCamera, FiMapPin, FiPhone, FiInfo, FiArrowLeft, FiSave, FiUser} from "react-icons/fi";

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const showSnackbar = useUIStore((state) => state.showSnackbar);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: "",
    contact_number: "",
    profile_picture: "",
    location: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axiosInstance.get("/accounts/profile/");
        setFormData({
          bio: res.data.bio || "",
          contact_number: res.data.contact_number || "",
          profile_picture: res.data.profile_picture || "",
          location: res.data.location || "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
        showSnackbar("Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [showSnackbar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axiosInstance.put("/accounts/profile/", formData);
      
      // Update AuthContext so the ViewProfile and Sidebar update immediately
      setUser((prev) => ({ 
        ...prev, 
        profile: { ...prev.profile, ...res.data } 
      }));
      
      showSnackbar("Profile updated successfully!", "success");
      navigate(-1); // Go back to ViewProfile
    } catch (err) {
      console.error("Failed to update profile", err);
      showSnackbar("Update failed. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <EditProfileSkeleton />;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <FiArrowLeft /> Back to Profile
        </button>
        <h2 className="text-2xl font-bold dark:text-white text-gray-800">Edit Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Avatar Preview Section --- */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
               {
                  formData.profile_picture ?
                  (
                    <img
                      src={formData.profile_picture}
                      alt="Preview"
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-50 dark:border-slate-700 shadow-md"
                    />
                  ):(<FiUser className="bg-white dark:bg-slate-800 text-gray-300 dark:text-white-900 bg: text-3xl w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-700 object-cover shadow-lg" />)
                }
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera className="text-white text-xl" />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-slate-300">
                Profile Picture URL
              </label>
              <input
                type="text"
                name="profile_picture"
                placeholder="https://example.com/photo.jpg"
                value={formData.profile_picture}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              />
              <p className="text-xs text-gray-400 mt-2 italic">Paste a link to your image.</p>
            </div>
          </div>
        </div>

        {/* --- Information Grid --- */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700 dark:text-slate-300">
                <FiPhone className="text-blue-500" /> Contact Number
              </label>
              <input
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700 dark:text-slate-300">
                <FiMapPin className="text-blue-500" /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700 dark:text-slate-300">
                <FiInfo className="text-blue-500" /> Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/50 transition-all disabled:opacity-50 active:scale-95"
          >
            {saving ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Detailed Skeleton for Edit View ---
const EditProfileSkeleton = () => (
  <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
    <div className="flex justify-between items-center mb-8">
      <Skeleton width={100} height={24} className="dark:bg-slate-700" />
      <Skeleton width={150} height={32} className="dark:bg-slate-700" />
    </div>
    
    {/* Avatar Block Skeleton */}
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-6">
        <Skeleton variant="rectangular" width={96} height={96} className="rounded-2xl dark:bg-slate-700" />
        <div className="flex-1 space-y-2">
          <Skeleton width="30%" className="dark:bg-slate-700" />
          <Skeleton height={45} className="rounded-xl dark:bg-slate-700" />
        </div>
      </div>
    </div>

    {/* Form Grid Skeleton */}
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton width="40%" className="dark:bg-slate-700" />
            <Skeleton height={45} className="rounded-xl dark:bg-slate-700" />
          </div>
        ))}
        <div className="col-span-2 space-y-2">
          <Skeleton width="20%" className="dark:bg-slate-700" />
          <Skeleton height={120} className="rounded-xl dark:bg-slate-700" />
        </div>
      </div>
    </div>
  </div>
);