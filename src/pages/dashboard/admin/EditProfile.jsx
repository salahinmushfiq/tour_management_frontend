//EditProfile
import React, { useEffect, useState } from "react";
import  axiosInstance  from "../../../api/axiosInstance";
export default function EditProfile() {
  const [formData, setFormData] = useState({
    bio: "",
    contact_number: "",
    profile_picture: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const theme = localStorage.getItem("theme") || "light";

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
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.put("/accounts/profile/", formData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading profile...</p>;
  }

  return (
    <div
      className="p-6 max-w-3xl mx-auto rounded-xl shadow-lg dark:bg-slate-800 dark:text-white bg-white text-black"
    >
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4 dark:bg-slate-800 dark:text-white bg-white text-black">
        <div>
          <label className="block mb-1">Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Profile Picture URL</label>
          <input
            type="text"
            name="profile_picture"
            value={formData.profile_picture}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white bg-white text-black"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
