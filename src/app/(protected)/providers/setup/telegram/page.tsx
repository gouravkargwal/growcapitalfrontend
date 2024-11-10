"use client";

import { Suspense, useEffect, useState } from "react";

import axiosInstance from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";

const TelegramSetupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TelegramSetupContent />
    </Suspense>
  );
};


const TelegramSetupContent = () => {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchTelegramLink = async () => {
    if (!providerId) return; // Ensure providerId is present
    try {
      setLoading(true);
      setError(""); // Reset error state
      const response = await axiosInstance.get(
        `/user-provider/configure-telegram?providerId=${providerId}`
      );
      setLink(response.data.link); // Assuming the response has a 'link' field
      setSuccess("Telegram bot link fetched successfully!"); // Success feedback
    } catch (error) {
      console.error(error);
      setError("Failed to fetch the Telegram bot link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelegramLink(); // Fetch the link when the component mounts
  }, [providerId]);

  const handleButtonClick = () => {
    if (link) {
      window.open(link, "_blank"); // Open the link in a new tab if it exists
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Set Up Your Telegram Channel
        </h1>
        <p className="text-gray-600 mb-6">
          To set up your Telegram channel, please follow these instructions:
        </p>
        <ol className="text-left mb-6">
          <li className="mb-2">
            1. Click the button below to open the Telegram bot.
          </li>
          <li className="mb-2">
            2. In the chat, click "Start" or "Send" to initiate the setup.
          </li>
          <li>3. Follow any further instructions provided by the bot.</li>
        </ol>
        {loading ? (
          <div className="flex justify-center mt-4">
            <span className="loader"></span> {/* Placeholder for a spinner */}
            <p className="text-gray-600 ml-2">Loading...</p>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleButtonClick}
              disabled={!link || !!error} // Disable button if there is no link or if there's an error
              className={`px-6 py-2 rounded-lg transition duration-300 ${
                !link || !!error
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Open Telegram Bot
            </button>
          </div>
        )}
        {success && (
          <p className="mt-4 text-green-600 font-semibold">{success}</p>
        )}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </div>
    </div>
  );
};

export default TelegramSetupPage;
