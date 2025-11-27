import React from "react";

export default function FilterSearchSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-row gap-2 mb-4">
        <div className="w-32 h-10 bg-gray-200 rounded" />
        <div className="w-32 h-10 bg-gray-200 rounded" />
        <div className="w-20 h-10 bg-gray-200 rounded" />
      </div>

      <div className="border-y my-4 py-4 flex flex-row gap-3 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-24 h-16 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
