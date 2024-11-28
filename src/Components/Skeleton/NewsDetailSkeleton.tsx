import React from "react";

const NewsDetailSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 mb-6 max-w-sm h-full animate-pulse">
      {/* Skeleton Image */}
      <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>

      {/* Skeleton Content */}
      <div className="flex flex-col flex-grow">
        {/* Source and Time */}
        <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>

        {/* Title */}
        <div className="w-48 h-6 bg-gray-300 rounded mb-2"></div>

        {/* Description */}
        <div className="w-full h-16 bg-gray-300 rounded mb-4"></div>
      </div>

      {/* Footer: Metadata and Button */}
      <div className="mt-4">
        <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-12 bg-blue-500 rounded"></div>
      </div>
    </div>
  );
};

export default NewsDetailSkeleton;
