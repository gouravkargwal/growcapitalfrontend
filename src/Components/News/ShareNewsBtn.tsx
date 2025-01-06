"use client";

import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { logEvent } from "@/events/analytics";
import { shareClicked } from "@/events/news/news-details-events";

interface ShareButtonProps {
  stockNewsId: string;
  shortSummary: string;
  heading: string;
}

const ShareNewsBtn: React.FC<ShareButtonProps> = ({
  stockNewsId,
  shortSummary,
  heading,
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shareMessage = `${shortSummary}\n\nRead more: ${window.location.origin}/news/${stockNewsId}\n\nAI-powered stock news update by informe.in`;
        await navigator.share({
          title: heading,
          text: shareMessage,
          url: `${window.location.origin}/news/${stockNewsId}`,
        });
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
    logEvent(shareClicked(stockNewsId));
  };

  return (
    <button
      className="bg-primary text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2 hover:accent transition-all duration-200"
      onClick={handleShare}
    >
      <FaShareAlt />
      <span>Share</span>
    </button>
  );
};

export default ShareNewsBtn;
