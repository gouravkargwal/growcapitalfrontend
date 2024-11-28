import { News } from "@/Feature/News/newsSlice";
import getTimeAgoOrDate from "@/utils/getTimeAgoOrDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaClock, FaShareAlt } from "react-icons/fa";

const NewsCard: React.FC<News> = ({
  companyName,
  heading,
  industry,
  newsId,
  newsTime,
  shortSummary,
  longSummary
}) => {
  const router = useRouter();
  const handleShowMore = () => {
    router.push(`/news/${newsId}`);
  };

  const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200; 
    const wordCount = text.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute); 
    return `${readTimeMinutes} min read`;
  };

  return (
    <>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-primary">BSE News</span>
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <FaClock className="text-gray-400" />
              <span>{getTimeAgoOrDate(newsTime)}</span>
            </div>
          </div>

          <button className="flex items-center text-primary border border-secondary rounded-2xl px-3 lg:px-4 py-1 hover:text-white hover:bg-secondary whitespace-nowrap">
            <FaShareAlt className="mr-2"/>
            <span>Share</span>
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">{heading}</h2>

        <div className="text-xs text-gray-500 mb-4">
          {calculateReadTime(longSummary)}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{shortSummary}</p>

        <div className="mt-auto mb-4">
          <Link
            href={`/news/${newsId}`}
            className="inline-flex items-center text-primary hover:text-accent text-xs font-semibold"
          >
            <span>Read the full report</span>
            <FaShareAlt className="ml-1" />
          </Link>
        </div>

        <div className="flex items-center justify-between border-t pt-4 text-xs text-gray-500 mt-auto">
          <span className="font-medium">{companyName}</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Industry: {industry}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
