import { Banner } from "./strategies";
import Footer from "../Header/Footer";
import React from "react";
import StocksList from "./StocksList";
import AccountOverview from "./AccountOverview";
import NotificationFilter from "./NotificationFilter";
import Languages from "./Languages";
import ReferAndEarn from "./ReferAndEarn";
import Providers from "./setup";

const Dashboard = () => {
  const strategies = [
    { id: '1', name: 'ADANIPORTS', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/ADANIPORTS.NS.png', result: '+', color: 'text-green-600' },
    { id: '2', name: 'RELIANCE', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/RELIANCE.NS.png', result: '-', color: 'text-red-600' },
    { id: '3', name: 'PNB', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/PNB.NS.png', result: '+', color: 'text-green-600' },
    { id: '4', name: 'HAL', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/HAL.NS.png', result: '-', color: 'text-red-600' },
    { id: '5', name: 'CDSL', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/CDSL.NS.png', result: '+', color: 'text-green-600' },
    { id: '6', name: 'BSE', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/BSE.NS.png', result: '-', color: 'text-red-600' },
    { id: '7', name: 'CHAMBAL FERTILIZERS', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/CHAMBLFERT.NS.png', result: '+', color: 'text-green-600' },
    { id: '8', name: 'ZOMATO', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/ZOMATO.NS.svg', result: '+', color: 'text-green-600' },
    { id: '9', name: 'TATA MOTORS', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/TATAMOTORS.NS.png', result: '-', color: 'text-red-600' },
    { id: '10', name: 'MANKIND', icon: 'https://d140p29c73x6ns.cloudfront.net/temp/MANKIND.NS.png', result: '+', color: 'text-green-600' },
  ];
  return (
    <div className="w-full">
      <AccountOverview />
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
      <div className="mx-2 p-2">
        <Providers />
      </div>
      <div className="relative mx-2 p-4 mt-5 mb-10">
        <h1 className="text-lg font-bold mb-2 text-gray-900">Predictions 14 days*</h1>
        <Banner strategies={strategies} speed={12000} />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-black text-3xl font-bold rounded-md">
          Coming Soon
        </div>
      </div>
      <Footer intenalFooter />
    </div>
  );
};

export default Dashboard;
