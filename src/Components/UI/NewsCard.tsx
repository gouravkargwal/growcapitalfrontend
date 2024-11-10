import Image from "next/image";
import NewsCardSkeleton from "./NewsCardSkeleton";
import React from "react";
interface NewsCardProps {
  title: string;
  date: string;
  imageUrl: string;
  className?: string;
  isLoading?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  date,
  imageUrl,
  className,
  isLoading,
}) => {
  if (isLoading) {
    return <NewsCardSkeleton />;
  }

  return (
    <div
      className={`rounded-lg ${className}`}
    >
      <div className="relative w-full h-48 sm:h-64">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500">Created on {date}</p>
      </div>
    </div>
  );
};

export default NewsCard;