const NewsCardSkeleton: React.FC = () => {
    return (
      <div className="w-full sm:w-80 rounded-lg shadow-lg overflow-hidden animate-pulse"> {/* Added w-full and sm:w-80 for width */}
        <div className="bg-gray-300 w-full h-48 sm:h-64"></div> {/* Placeholder for the image */}
        <div className="p-4">
          <div className="bg-gray-300 h-4 w-3/4 mb-4 rounded"></div> {/* Placeholder for the title */}
          <div className="bg-gray-300 h-3 w-1/2 rounded"></div> {/* Placeholder for the date */}
        </div>
      </div>
    );
  };
  
  export default NewsCardSkeleton;
  