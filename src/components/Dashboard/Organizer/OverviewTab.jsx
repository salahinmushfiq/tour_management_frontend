import React from "react";

export default function OverviewTab({
  tour,
  isEditing,
  formData,
  setFormData,
  saving,
  error,
  onSave,
  onCancel,
}) {
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="description"
              className="block font-semibold mb-1 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-y"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block font-semibold mb-1 dark:text-white"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cost_per_person"
                className="block font-semibold mb-1 dark:text-white"
              >
                Cost per Person ($)
              </label>
              <input
                type="number"
                id="cost_per_person"
                name="cost_per_person"
                value={formData.cost_per_person}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="max_participants"
                className="block font-semibold mb-1 dark:text-white"
              >
                Max Participants
              </label>
              <input
                type="number"
                id="max_participants"
                name="max_participants"
                value={formData.max_participants}
                onChange={handleChange}
                min="0"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_custom_group"
              name="is_custom_group"
              checked={formData.is_custom_group}
              onChange={handleChange}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_custom_group" className="dark:text-white">
              Custom Group
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start_date"
                className="block font-semibold mb-1 dark:text-white"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="end_date"
                className="block font-semibold mb-1 dark:text-white"
              >
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start_location"
                className="block font-semibold mb-1 dark:text-white"
              >
                Start Location
              </label>
              <input
                type="text"
                id="start_location"
                name="start_location"
                value={formData.start_location}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="end_location"
                className="block font-semibold mb-1 dark:text-white"
              >
                End Location
              </label>
              <input
                type="text"
                id="end_location"
                name="end_location"
                value={formData.end_location}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p className="whitespace-pre-line">{tour.description || "No description."}</p>

          <ul className="space-y-1">
            <li>
              <strong>Category:</strong> {tour.category}
            </li>
            <li>
              <strong>Cost per Person:</strong> ${parseFloat(tour.cost_per_person).toFixed(2)}
            </li>
            <li>
              <strong>Max Participants:</strong> {tour.max_participants}
            </li>
            <li>
              <strong>Custom Group:</strong> {tour.is_custom_group ? "Yes" : "No"}
            </li>
            <li>
              <strong>Start Date:</strong> {tour.start_date}
            </li>
            <li>
              <strong>End Date:</strong> {tour.end_date}
            </li>
            <li>
              <strong>Start Location:</strong> {tour.start_location}
            </li>
            <li>
              <strong>End Location:</strong> {tour.end_location}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
