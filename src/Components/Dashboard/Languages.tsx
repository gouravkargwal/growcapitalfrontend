"use client";
import {
  fetchUserLanguages,
  updateUserLanguage,
} from "@/Feature/Language/languageSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Languages = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserLanguages());
  }, [dispatch]);
  const { userLanguages, userLanguagesLoading, updateUserLanguageLoading } =
    useSelector((state: RootState) => state.language);

  const handleLanguageSelection = async (languageId: number) => {
    if (!updateUserLanguageLoading) {
      dispatch(updateUserLanguage({ languageId }));
    }
  };
  return (
    <div className="mb-2">
      <h2 className="text-xl font-bold">Language Preferences</h2>
      <p className="text-sm text-gray-400 mb-4">
        Select your preferred language for stock updates:
      </p>

      {userLanguagesLoading ? (
        <div className="flex space-x-4">
          <div className="animate-pulse bg-gray-300 h-10 w-24 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 h-10 w-24 rounded-lg"></div>
        </div>
      ) : (
        <div className="flex space-x-4">
          {userLanguages.map((language) => (
            <div
              key={language?.languageId}
              onClick={() => handleLanguageSelection(language?.languageId)}
              className={`cursor-pointer px-4 py-2 rounded-lg border ${
                language?.isSelected ? "border-blue-500" : "border-gray-300"
              } hover:border-blue-500 ${
                updateUserLanguageLoading
                  ? "opacity-50 pointer-events-none"
                  : "" // Disable interaction during loading
              }`}
            >
              <span className="text-lg font-semibold">
                {language?.languageName}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Languages;
