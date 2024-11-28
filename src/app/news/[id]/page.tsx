import React from "react";
import { notFound } from "next/navigation";
import { getNewsById } from "@/Feature/News/news.service";
import { FaClock, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";

interface NewsDetailProps {
  params: { id: string };
}

const NewsDetail = async ({ params }: NewsDetailProps) => {
  const { id } = params;

  let newsDetail: any = null;
  try {
    const { data } = await getNewsById(id);
    newsDetail = await data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
  }

  if (!newsDetail) {
    notFound(); // Renders a 404 page if news is not found
  }

  // Function to format the publish date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Article Wrapper */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* News Source */}
              <span className="text-2xl font-semibold text-blue-600">BSE News</span>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <FaClock className="text-gray-400" />
                <span>{formatDate(newsDetail.exchange_receive_time)}</span>
              </div>
            </div>
            {/* Share Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2 hover:bg-blue-700 transition-all duration-200">
                <FaShareAlt />
                <span>Share</span>
              </button>
              {/* Social Media Share Icons */}
              <div className="flex space-x-3 text-gray-600">
                <a href="#" className="hover:text-blue-600">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-blue-400">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-blue-700">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{newsDetail.heading}</h1>

          {/* Article Summary */}
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{newsDetail.shortSummary}</p>
        </div>

        {/* Full Article Body */}
        <div className="prose prose-lg mx-auto text-gray-800 mb-8 px-6">
          <p>{newsDetail.paragraph}</p>

          {/* Full PDF Link */}
          {newsDetail.pdfLink && (
            <div className="mt-6">
              <a
                href={newsDetail.pdfLink}
                target="_blank"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                <span>Read the full report</span>
                <FaShareAlt className="ml-2" />
              </a>
            </div>
          )}
        </div>

        {/* Author and Footer Section */}
        <div className="bg-gray-100 px-6 py-4 mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">Written by {newsDetail.author || "BSE News Team"}</span>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Source: BSE</span>
              <span className="text-gray-400">Industry: {newsDetail.stock.industry}</span>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="px-6 py-8 border-t border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Articles</h3>
          <div className="space-y-4">
            {/* You can loop through related articles if available */}
            {newsDetail.relatedArticles?.map((related: any) => (
              <div key={related.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <h4 className="text-lg font-bold text-gray-800">{related.title}</h4>
                <p className="text-sm text-gray-600">{related.shortSummary}</p>
                <a
                  href={`/news/${related.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold mt-2 inline-block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;

export const dynamicParams = true;
