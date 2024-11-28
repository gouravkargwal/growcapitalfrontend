"use client";

import {
  LanguageState,
  fetchUserLanguages,
  updateUserLanguage,
} from "@/Feature/Language/languageSlice";
import React, { useEffect } from "react";

import { RootState } from "@/Store/store";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";

const Languages = () => {
  const dispatch = useAppDispatch();

  // Fetch languages when component mounts
  useEffect(() => {
    dispatch(fetchUserLanguages());
  }, [dispatch]);

  const { userLanguages, userLanguagesLoading, updateUserLanguageLoading } =
    useSelector<RootState, LanguageState>((state) => state.language);

  // Handle language selection
  const handleLanguageSelection = async (languageId: number) => {
    if (!updateUserLanguageLoading) {
      dispatch(updateUserLanguage({ languageId }));
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-900">Language Preferences</h2>
      <p className="text-sm text-gray-500 mb-4">
        Select your preferred language for stock updates:
      </p>

      {/* Display loading state */}
      {userLanguagesLoading ? (
        <div className="flex space-x-4">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-300 h-10 w-24 rounded-lg"
              ></div>
            ))}
        </div>
      ) : userLanguages.length > 0 ? (
        <div className="flex space-x-4">
          {userLanguages.map((language) => (
            <div
              key={language.languageId}
              onClick={() => handleLanguageSelection(language.languageId)}
              className={`cursor-pointer px-4 py-2 rounded-lg border transition-all duration-300 ${
                language.isSelected
                  ? "border-primary bg-[#FDF8F1] text-primary"
                  : "border-gray-300 bg-white"
              } hover:border-primary ${
                updateUserLanguageLoading
                  ? "opacity-50 pointer-events-none"
                  : "" // Disable interaction during update loading
              }`}
            >
              <span className="text-lg font-semibold">
                {language.languageName}
              </span>
            </div>
          ))}
        </div>
      ) : (
        // Show feedback if no languages are available
        <p className="text-gray-500">No available languages to select from.</p>
      )}

      {/* Show loading message during update */}
      {updateUserLanguageLoading && (
        <p className="mt-2 text-primary">Updating language preference...</p>
      )}
    </div>
  );
};

export default Languages;
