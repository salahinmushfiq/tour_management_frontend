import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OffersTab({ tourId, canEdit }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For add/edit form state
  const [editingOffer, setEditingOffer] = useState(null); // null = no edit, or {offer data} for edit
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_percent: "",
    valid_from: "",
    valid_until: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchOffers() {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/tours/offers/?tour=${tourId}`);
        setOffers(res.data);
      } catch (err) {
        setError("Failed to load offers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, [tourId]);

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      discount_percent: "",
      valid_from: "",
      valid_until: "",
    });
    setEditingOffer(null);
    setError(null);
  }

  function startAdd() {
    resetForm();
    setEditingOffer({}); // empty object means new offer
  }

  function startEdit(offer) {
    setFormData({
      title: offer.title || "",
      description: offer.description || "",
      discount_percent: offer.discount_percent?.toString() || "",
      valid_from: offer.valid_from || "",
      valid_until: offer.valid_until || "",
    });
    setEditingOffer(offer);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    // Basic validation
    if (!formData.title.trim()) {
      setError("Title is required.");
      setSaving(false);
      return;
    }
    if (!formData.discount_percent || isNaN(formData.discount_percent)) {
      setError("Valid discount percent is required.");
      setSaving(false);
      return;
    }
    if (!formData.valid_from || !formData.valid_until) {
      setError("Valid date range is required.");
      setSaving(false);
      return;
    }
    if (new Date(formData.valid_from) > new Date(formData.valid_until)) {
      setError("Valid from date cannot be after valid until date.");
      setSaving(false);
      return;
    }

    try {
      if (editingOffer && editingOffer.id) {
        // Update existing offer
        const res = await axiosInstance.patch(`/tours/offers/${editingOffer.id}/`, {
          title: formData.title,
          description: formData.description,
          discount_percent: parseInt(formData.discount_percent, 10),
          valid_from: formData.valid_from,
          valid_until: formData.valid_until,
        });
        setOffers((prev) =>
          prev.map((o) => (o.id === editingOffer.id ? res.data : o))
        );
      } else {
        // Create new offer
        const res = await axiosInstance.post(`/tours/offers/`, {
          tour: tourId,
          title: formData.title,
          description: formData.description,
          discount_percent: parseInt(formData.discount_percent, 10),
          valid_from: formData.valid_from,
          valid_until: formData.valid_until,
        });
        setOffers((prev) => [res.data, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError("Failed to save offer.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await axiosInstance.delete(`/tours/offers/${id}/`);
      setOffers((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      alert("Failed to delete offer.");
      console.error(err);
    }
  }

  if (loading) return <p>Loading offers...</p>;
  if (error && !editingOffer) return <p className="text-red-600">{error}</p>;

  return (
    <div className="text-gray-700 dark:text-gray-300">
      {canEdit && !editingOffer && (
        <button
          onClick={startAdd}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add New Offer
        </button>
      )}

      {editingOffer && (
        <div className="border rounded p-4 mb-6 bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-4">
            {editingOffer.id ? "Edit Offer" : "Add New Offer"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="title">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-y"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
                htmlFor="discount_percent"
              >
                Discount Percent <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="discount_percent"
                name="discount_percent"
                value={formData.discount_percent}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1" htmlFor="valid_from">
                  Valid From <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="valid_from"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="valid_until">
                  Valid Until <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="valid_until"
                  name="valid_until"
                  value={formData.valid_until}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditingOffer(null);
                  setError(null);
                }}
                disabled={saving}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!editingOffer && offers.length === 0 && <p>No current offers or discounts.</p>}

      {!editingOffer && offers.length > 0 && (
        <ul className="space-y-3 max-h-96 overflow-auto">
          {offers.map((offer) => (
            <li
              key={offer.id}
              className="border rounded p-3 bg-gray-100 dark:bg-gray-800 flex justify-between items-start"
            >
              <div>
                <h4 className="font-semibold">{offer.title}</h4>
                <p className="text-sm whitespace-pre-line">{offer.description}</p>
                <p>
                  <strong>Discount:</strong> {offer.discount_percent}%
                </p>
                <p className="text-xs text-gray-500">
                  Valid from: {formatDate(offer.valid_from)}
                </p>
                <p className="text-xs text-gray-500">
                  Valid until: {formatDate(offer.valid_until)}
                </p>
              </div>

              {canEdit && (
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => startEdit(offer)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
