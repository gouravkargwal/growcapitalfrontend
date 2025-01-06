"use client";

import React from "react";
import { logEvent } from "@/events/analytics";
import { filingClicked } from "@/events/news/news-details-events";

interface FilingLinkProps {
  pdfLink: string;
  stockNewsId: string;
}

const FilingLink: React.FC<FilingLinkProps> = ({ pdfLink, stockNewsId }) => {
  const handleClick = () => {
    logEvent(filingClicked(stockNewsId));
  };

  return (
    <a
      href={pdfLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-primary hover:text-accent text-sm font-semibold"
      onClick={handleClick}
    >
      View Exchange Filing
    </a>
  );
};

export default FilingLink;
