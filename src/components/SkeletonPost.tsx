import React from 'react';

export default function SkeletonPost() {
  return (
    <div className="bg-white p-6 border-b border-gray-100 animate-pulse">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
