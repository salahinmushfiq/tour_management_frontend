import React from "react";

const EventFilter = ({ filters, setFilters, options }) => {
  const handleInputChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const clearAll = () => {
    setFilters({ category: "", location: "" });
  };

  const hasFilters = filters.category || filters.location;

  return (
    <div className="mb-6 max-w-4xl mx-auto">
      {/* Filter Inputs */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {/* Category selection */}
        <select
          value={filters.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-48"
        >
          <option value="">All Categories</option>
          {options.categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Location selection */}
        <select
          value={filters.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-48"
        >
          <option value="">All Locations</option>
          {options.locations.map((loc) => (
            <option key={loc} value={loc} >
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Selected filters as chips */}
      <div className="flex flex-wrap gap-3 justify-center">
        {filters.category && (
          <div className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-full">
            {filters.category}
            <button
              onClick={() => removeFilter("category")}
              className="ml-2 font-bold hover:text-indigo-300"
              aria-label="Remove category filter"
            >
              ×
            </button>
          </div>
        )}

        {filters.location && (
          <div className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-full">
            {filters.location}
            <button
              onClick={() => removeFilter("location")}
              className="ml-2 font-bold hover:text-indigo-300"
              aria-label="Remove location filter"
            >
              ×
            </button>
          </div>
        )}

        {/* Clear All */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="ml-4 px-3 py-1 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
