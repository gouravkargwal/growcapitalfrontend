import { Banner } from "./strategies";
import Card from "../UI/Card";
import Footer from "../Header/Footer";
import NewsCard from "../UI/NewsCard";
import React from "react";
import Settings from "./settings";
import StocksList from "./StocksList"

const Dashboard = () => {
  const cards = [
    {
      id: 1,
      title: "Stocks Subscribed",
      value: "10",
      color: "#dcfce7", // green-100 equivalent
      borderColor: "#4ade80", // green-400 equivalent
      icon: "📈",
    },
    {
      id: 2,
      title: "News Sent",
      value: "4",
      color: "#f3e8ff", // purple-100 equivalent
      borderColor: "#c084fc", // purple-400 equivalent
      icon: "📰",
    },
    {
      id: 3,
      title: "Total Referrals",
      value: "8",
      color: "#ffedd5", // orange-100 equivalent
      borderColor: "#fb923c", // orange-400 equivalent
      icon: "👦",
    },
    {
      id: 4,
      title: "Current Plan",
      value: "Pro",
      color: "#dbeafe", // blue-100 equivalent
      borderColor: "#60a5fa", // blue-400 equivalent
      icon: "⚡️",
    },
  ];

  const strategies = [
    {
      id: "1",
      name: "ADANIPORTS",
      icon: "https://d140p29c73x6ns.cloudfront.net/temp/ADANIPORTS.NS.png",
      result: "+",
      color: "text-green-600",
    },
    {
      id: "2",
      name: "RELIANCE",
      icon: "https://d140p29c73x6ns.cloudfront.net/temp/RELIANCE.NS.png",
      result: "-",
      color: "text-red-600",
    },
    // ...other strategies
  ];

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
    <div className="flex-1 w-full overflow-y-auto">
      <div className="mx-auto bg-white">
        <div className="mx-2 p-2">
          <h2 className="text-lg font-bold mb-2">Account Overview</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                icon={card.icon}
                color={card.color}
                count={card.value}
                label={card.title}
                borderColor={card.borderColor}
              />
            ))}
          </div>
        </div>

        {/* News Section */}
        <div className="mx-2 p-2">
          <h2 className="text-lg font-bold mb-2">Your Timeline</h2>
          <p className="text-gray-500 mb-2">
            Browse top news from your portfolio
          </p>
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

        {/* Stocks List */}
        <div className="mx-2 p-2">
          <StocksList />
        </div>

        {/* Settings */}
        <div className="mx-2 p-2">
          <Settings />
        </div>

        {/* Predictions Banner */}
        <div className="relative mx-2 p-4 mt-5 mb-10">
          <h1 className="text-xl font-bold mb-2">Predictions 14 days*</h1>
          <Banner strategies={strategies} speed={12000} />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-black text-3xl font-bold rounded-md">
            Coming Soon
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
