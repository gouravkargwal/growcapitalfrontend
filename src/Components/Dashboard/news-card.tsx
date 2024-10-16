import React from "react";

interface NewsCardProps {
  title: string;
  date: string;
  imageUrl: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  date,
  imageUrl,
  className,
}) => {
  return (
    <div className={`rounded-lg ${className}`}>
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg mb-2 sm:mb-4 object-cover"
      />
      <h3 className="text-sm sm:text-lg font-semibold">{title}</h3>
      <p className="text-xs sm:text-base text-gray-500">Created on {date}</p>
    </div>
  );
};

export default NewsCard;
