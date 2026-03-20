import React from "react";

export default function EventSkeletonCard() {
  return (
    <div className="relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full animate-pulse">
      
      {/* Image Section Skeleton */}
      <div className="relative h-44 w-full bg-slate-700/50">
        {/* Category Tag Skeleton */}
        <div className="absolute top-3 left-3 w-16 h-5 bg-slate-600 rounded-full" />
        {/* Gradient Overlay mimic */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-700/70 rounded-md w-3/4" />

        {/* Location Block Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-700 rounded-full shrink-0" />
            <div className="h-4 bg-slate-700/50 rounded w-1/2" />
          </div>
          <div className="w-24 h-4 bg-slate-800/80 rounded border border-slate-700" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-700/50">
          <div className="space-y-2">
            <div className="h-2 bg-slate-800 rounded w-8" />
            <div className="h-4 bg-slate-700 rounded w-16" />
          </div>
          <div className="space-y-2 flex flex-col items-end">
            <div className="h-2 bg-slate-800 rounded w-10" />
            <div className="h-4 bg-slate-700 rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}