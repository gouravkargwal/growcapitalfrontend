"use client";

import React from "react";
import Link from "next/link";
import { logEvent } from "@/events/analytics";
import { relatedClicked } from "@/events/news/news-details-events";

interface RelatedArticleLinkProps {
  stockNewsId: string;
  children: React.ReactNode;
}

const RelatedArticleLink: React.FC<RelatedArticleLinkProps> = ({
  stockNewsId,
  children,
}) => {
  const handleClick = () => {
    logEvent(relatedClicked(stockNewsId));
  };

  return (
    <Link
      href={`/news/${stockNewsId}`}
      className="text-primary hover:text-accent text-sm font-semibold inline-block"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default RelatedArticleLink;
