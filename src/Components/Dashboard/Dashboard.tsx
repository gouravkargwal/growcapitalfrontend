import { Banner } from "./strategies";
import Footer from "../Header/Footer";
import React from "react";
import StocksList from "./StocksList";
import AccountOverview from "./AccountOverview";
import NotificationFilter from "./NotificationFilter";
import Languages from "./Languages";
import ReferAndEarn from "./ReferAndEarn";
import News from "./News";

const Dashboard = () => {
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

  return (
    <div className="flex-1 w-full overflow-y-auto">
      <div className="mx-auto bg-white">
        <AccountOverview />

        <div className="mx-2 p-2">
          <News />
        </div>
        <div className="mx-2 p-2">
          <StocksList />
        </div>

        <div className="mx-2 p-2">
          <NotificationFilter />
        </div>
        <div className="mx-2 p-2">
          <ReferAndEarn />
        </div>
        <div className="mx-2 p-2">
          <Languages />
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
