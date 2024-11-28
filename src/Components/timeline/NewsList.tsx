import React, { useEffect, useRef, useCallback } from "react";
import NewsCard from "./TimelineNewsCard";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchNews } from "@/Feature/News/newsSlice";
import getTimeAgoOrDate from "@/utils/getTimeAgoOrDate";

// Skeleton Loader
const NewsSkeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 p-4 rounded-lg shadow-md">
    <div className="bg-gray-300 h-40 w-full mb-4 sm:h-48 md:h-56"></div>{" "}
    {/* Responsive height */}
    <div className="h-4 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 w-3/4"></div>
  </div>
);

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { timelineData, timelineDataLoading, currentPage, hasMore } =
    useSelector((state: RootState) => state.news);
  const observer = useRef<IntersectionObserver | null>(null);
  console.log(timelineData);


  // Infinite Scroll Observer
  const lastNewsElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (timelineDataLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchNews({ page: currentPage + 1 })); // Add an object with "page" key
        }
      });
      if (node) observer.current.observe(node);
    },
    [timelineDataLoading, hasMore, currentPage, dispatch]
  );

  useEffect(() => {
    if (currentPage === 1 && timelineData.length === 0) {
      dispatch(fetchNews({ page: 1 })); // Pass an object with "page" key
    }
  }, [dispatch, currentPage, timelineData.length]);

  return (
    <section className="container mx-auto px-4 py-8 flex flex-col">
      {/* Check if no data is available and not loading */}
      {!timelineDataLoading && timelineData.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No news available at the moment. Please check back later.</p>
        </div>
      )}

      {/* News Grid */}
      {timelineData && timelineData.length > 0 && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {timelineData.map((newsItem, index) => {
            if (timelineData.length === index + 1) {
              // Attach the ref to the last news card for infinite scroll
              return (
                <div ref={lastNewsElementRef} key={index}>
                  <NewsCard
                  {...newsItem}
                  />
                </div>
              );
            } else {
              return (
                <NewsCard
                 {...newsItem}
                />
              );
            }
          })}
        </div>
      )}

      {/* Display Skeletons while loading */}
      {timelineDataLoading && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <NewsSkeleton />
          <NewsSkeleton />
          <NewsSkeleton />
        </div>
      )}
    </section>
  );
};

export default NewsList;
