import Image from 'next/image';
import React from 'react';
import { FaClock } from 'react-icons/fa';

interface NewsCardProps {
    imageSrc: string;
    source: string;
    timeAgo: string;
    title: string;
    description: string;
    category: string;
    readTime: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ imageSrc, source, timeAgo, title, description, category, readTime }) => {
    return (
        <div className="flex bg-white rounded-lg shadow-md p-4 mb-6">
            {/* News Image */}
            <Image
            width={128}
            height={192}
                src={imageSrc}
                alt={title}
                className="w-48 h-32 object-cover rounded-lg mr-4"
            />

            {/* News Details */}
            <div className="flex flex-col justify-between">
                <div>
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
                    <p className="text-gray-500">{description}</p>
                </div>

                {/* Category and Read Time */}
                <div className="flex items-center text-sm text-gray-500 mt-4">
                    <span className="text-red-500 font-semibold">{category}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
