import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  count: string;
  label: string;
  color: string;
  borderColor: string;
}

const Card: React.FC<CardProps> = ({ icon, count, label, color, borderColor }) => {
  return (
    <div
      className="flex flex-col justify-between rounded-lg w-full sm:w-64 h-auto sm:h-36 border"
      style={{ backgroundColor: color, borderColor: borderColor }}
    >
      <div className="flex flex-col sm:flex-row justify-start p-4">
        <div className="bg-white p-2 rounded-md sm:mr-4 mb-2 sm:mb-0 justify-center items-center">
          <div className="text-xl md:text-3xl text-center">{icon}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-lg md:text-2xl font-bold text-black">{count}</div>
          <div className="text-gray-500 text-xs md:text-sm">{label}</div>
        </div>
      </div>
      <hr className="mt-1" style={{ borderColor: borderColor, marginBottom: '0' }} /> 
      <div className="flex justify-between items-center px-4 text-xs md:text-sm my-2" style={{ color: borderColor }}>
        <span>See Details</span>
        <span className="text-lg md:text-xl">→</span>
      </div>
    </div>
  );
};

export default Card;
