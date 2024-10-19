import React from "react";
import NewsCard from "../UI/NewsCard";

const News = () => {
  const newscards = [
    {
      title: "Bpcl increases dividend⚡️",
      date: "Aug 21, 2023",
      imageUrl:
        "https://via.placeholder.com/300x150.png?text=Bpcl+increases+dividend⚡️",
    },
    {
      title: "Adani ports volume trade done🔥",
      date: "Jun 14, 2023",
      imageUrl:
        "https://via.placeholder.com/300x150.png?text=Adani+ports+trade",
    },
    // ...other news cards
  ];
  return (
    <div className="mx-2 p-2">
      <h2 className="text-lg font-bold mb-2">Your Timeline</h2>
      <p className="text-gray-500 mb-2">Browse top news from your portfolio</p>
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {newscards.map((card, index) => (
          <NewsCard
            key={index}
            title={card.title}
            date={card.date}
            imageUrl={card.imageUrl}
            className="w-48 flex-shrink-0"
          />
        ))}
        <div className="rounded-lg flex-shrink-0 p-4 flex items-center justify-center">
          <span className="text-lg text-gray-500">More News →</span>
        </div>
      </div>
    </div>
  );
};

export default News;
