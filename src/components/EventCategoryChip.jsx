import React from "react";

export default function EventCategoryChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center bg-indigo-600 text-white rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2 select-none">
      {label}
      <button
        onClick={onRemove}
        className="ml-2 text-indigo-200 hover:text-white focus:outline-none"
        aria-label={`Remove filter ${label}`}
      >
        ×
      </button>
    </span>
  );
}
