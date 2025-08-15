import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import axiosInstance from "../../../../api/axiosInstance";

export default function TourCreate() {
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

  const [saving, setSaving] = useState(false);
  const theme = localStorage.getItem("theme") || "light";

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form to create tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axiosInstance.post("/tours/", formData);
      alert("Tour created successfully!");
      if (user.role === "admin") {
        navigate("/dashboard/admin/tours");
      } else {
        navigate("/dashboard/organizer/tours");
      }
    } catch (err) {
      console.error("Failed to create tour", err);
      alert("Failed to create tour. Please check your inputs and permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-xl shadow-lg dark:bg-slate-800 dark:text-white bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Create New Tour</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter tour title"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Describe the tour"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. Adventure, Cultural"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Cost per Person ($)</label>
            <input
              type="number"
              name="cost_per_person"
              value={formData.cost_per_person}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Start Location</label>
            <input
              type="text"
              name="start_location"
              value={formData.start_location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">End Location</label>
            <input
              type="text"
              name="end_location"
              value={formData.end_location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Max Participants</label>
            <input
              type="number"
              name="max_participants"
              value={formData.max_participants}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded"
              required
            />
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

        <div>
          <label className="block mb-1">Cover Image URL</label>
          <input
            type="text"
            name="cover_image"
            value={formData.cover_image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? "Creating..." : "Create Tour"}
        </button>
      </form>
    </div>
  );
}
