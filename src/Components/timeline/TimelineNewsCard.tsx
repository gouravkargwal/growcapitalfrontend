import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaClock } from "react-icons/fa";

interface NewsCardProps {
  imageSrc: string;
  source: string;
  timeAgo: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  id: string; // Add an ID for dynamic routing
}

const NewsCard: React.FC<NewsCardProps> = ({
  imageSrc,
  source,
  timeAgo,
  title,
  description,
  category,
  readTime,
  id,
}) => {
  const router = useRouter();
  const handleShowMore = () => {
    router.push(`/news/${id}`); // Navigate to the dynamic route using the ID
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 mb-6 max-w-sm h-full">
      {/* Header: News Image */}
      {/* <div className="mb-4">
        <Image
          width={128}
          height={192}
          src={imageSrc}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div> */}

      {/* Body: Title and Description */}
      <div className="flex flex-col flex-grow">
        {/* Source and Time */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="font-semibold text-black mr-2">{source}</span>
          <span className="mx-2">•</span>
          <FaClock className="mr-1" />
          {timeAgo}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-500 line-clamp-3">{description}</p>
      </div>

      {/* Footer: Metadata and Button */}
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="text-red-500 font-semibold">{category}</span>
          <span>{readTime}</span>
        </div>
        <button
          onClick={handleShowMore}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
