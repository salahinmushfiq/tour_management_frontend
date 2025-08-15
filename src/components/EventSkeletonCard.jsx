import React from "react";

export default function EventSkeletonCard() {
  return (
    <div className="bg-white/10 animate-pulse rounded-lg overflow-hidden shadow-lg h-60">
      <div className="h-40 bg-gray-700 w-full" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-700 rounded w-1/4" />
      </div>
    </div>
  );
}
