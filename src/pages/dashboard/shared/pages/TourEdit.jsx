import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AssignGuide from "../../organizer/AssignGuide";
import { useAuth } from "../../../../context/AuthContext";
import axiosInstance from "../../../../api/axiosInstance";

export default function TourEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    start_date: "",
    end_date: "",
    start_location: "",
    end_location: "",
    cost_per_person: "",
    max_participants: "",
    is_custom_group: false,
    cover_image: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });

  // 🔹 Fetch Tour details for editing
  useEffect(() => {
    async function fetchTour() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/tours/${id}/`);
        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category || "",
          start_date: res.data.start_date || "",
          end_date: res.data.end_date || "",
          start_location: res.data.start_location || "",
          end_location: res.data.end_location || "",
          cost_per_person: res.data.cost_per_person || "",
          max_participants: res.data.max_participants || "",
          is_custom_group: res.data.is_custom_group || false,
          cover_image: res.data.cover_image || "",
        });
      } catch (error) {
        console.error("Failed to fetch tour:", error);
        setSnackbar({ open: true, message: "Failed to load tour details.", type: "error" });
      } finally {
        setLoading(false);
      }
    }
    fetchTour();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.start_date) newErrors.start_date = "Start date is required.";
    if (!formData.end_date) newErrors.end_date = "End date is required.";
    if (!formData.start_location.trim()) newErrors.start_location = "Start location is required.";
    if (!formData.end_location.trim()) newErrors.end_location = "End location is required.";
    if (!formData.cost_per_person || Number(formData.cost_per_person) <= 0)
      newErrors.cost_per_person = "Cost per person must be greater than 0.";
    if (!formData.max_participants || Number(formData.max_participants) <= 0)
      newErrors.max_participants = "Max participants must be greater than 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);

    try {
      await axiosInstance.put(`/tours/${id}/`, formData);

      setSnackbar({ open: true, message: "Tour updated successfully!", type: "success" });

      setTimeout(() => {
        navigate(
          user.role === "admin"
            ? "/dashboard/admin/tours"
            : "/dashboard/organizer/tours"
        );
      }, 1500);
    } catch (err) {
      console.error("Failed to update tour", err);
      setSnackbar({ open: true, message: "Failed to update tour.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading tour data...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-xl shadow-lg dark:bg-slate-800 dark:text-white bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Edit Tour</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Category & Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div>
            <label className="block mb-1">Cost per Person ($)</label>
            <input
              type="number"
              name="cost_per_person"
              value={formData.cost_per_person}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.cost_per_person && (
              <p className="text-red-500 text-sm">{errors.cost_per_person}</p>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
          </div>

          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
          </div>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Start Location</label>
            <input
              type="text"
              name="start_location"
              value={formData.start_location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.start_location && (
              <p className="text-red-500 text-sm">{errors.start_location}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">End Location</label>
            <input
              type="text"
              name="end_location"
              value={formData.end_location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.end_location && (
              <p className="text-red-500 text-sm">{errors.end_location}</p>
            )}
          </div>
        </div>

        {/* Participants & Custom Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Max Participants</label>
            <input
              type="number"
              name="max_participants"
              value={formData.max_participants}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.max_participants && (
              <p className="text-red-500 text-sm">{errors.max_participants}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="is_custom_group"
              checked={formData.is_custom_group}
              onChange={handleChange}
            />
            <label>Custom Group</label>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-1">Cover Image URL</label>
          <input
            type="text"
            name="cover_image"
            value={formData.cover_image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* 🔹 Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white z-50 transition-opacity ${
            snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {snackbar.message}
        </div>
      )}

       {/* Guide Assignment section */}
      <AssignGuide tourId={id} userRole={user.role} />
    </div>
  );
}
