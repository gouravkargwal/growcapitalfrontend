import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col justify-between rounded-lg w-full sm:w-64 h-auto sm:h-36 border bg-gray-100 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-start p-4">
        <div className="bg-gray-300 p-3 rounded-lg flex justify-center items-center sm:mr-4 mb-2 sm:mb-0 w-12 h-12"></div>
        <div className="flex flex-col justify-center">
          <div className="bg-gray-300 h-6 w-16 rounded mb-2"></div>
          <div className="bg-gray-300 h-4 w-24 rounded"></div>
        </div>
      </div>
      <hr className="mt-1 border-gray-300" />
      <div className="flex justify-between items-center px-4 my-2">
        <span className="bg-gray-300 h-4 w-16 rounded"></span>
        <span className="bg-gray-300 h-6 w-6 rounded-full"></span>
      </div>
    </div>
  );
};

export default CardSkeleton;
