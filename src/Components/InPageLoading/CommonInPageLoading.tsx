"use client";
import React, { useEffect, useState } from "react";

const CommonInPageLoading = () => {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPageLoaded(true); // Trigger fade-out after 2 seconds or when ready
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`${
        pageLoaded ? "opacity-0" : "opacity-100"
      } fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50 transition-opacity duration-500`}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default CommonInPageLoading;
