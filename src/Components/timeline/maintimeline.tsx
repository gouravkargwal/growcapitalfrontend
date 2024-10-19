import React, { useEffect, useRef, useCallback } from "react";
import NewsCard from "./TimelineNewsCard";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchNews } from "@/Feature/News/newsSlice";

// Skeleton Loader
const NewsSkeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 p-4 rounded-lg shadow-md h-48">
    <div className="bg-gray-300 h-32 w-full mb-4"></div>
    <div className="h-4 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 w-3/4"></div>
  </div>
);

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { timelineData, timelineDataLoading, currentPage, hasMore } =
    useSelector((state: RootState) => state.news);
  const observer = useRef<IntersectionObserver | null>(null);

  // Infinite Scroll Observer
  const lastNewsElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (timelineDataLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchNews(currentPage)); // Fetch more news when the last item is visible
        }
      });
      if (node) observer.current.observe(node);
    },
    [timelineDataLoading, hasMore, currentPage, dispatch]
  );

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(fetchNews(1)); // Load initial data on mount
    }
  }, [dispatch, currentPage]);

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest News</h2>

      {/* Check if no data is available and not loading */}
      {!timelineDataLoading && timelineData.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No news available at the moment. Please check back later.</p>
        </div>
      )}

      {/* News Grid */}
      {timelineData.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {timelineData.map((newsItem, index) => {
            if (timelineData.length === index + 1) {
              // Attach the ref to the last news card for infinite scroll
              return (
                <div ref={lastNewsElementRef} key={index}>
                  <NewsCard
                    imageSrc={newsItem.imageSrc}
                    source={newsItem.source}
                    timeAgo={newsItem.timeAgo}
                    title={newsItem.title}
                    description={newsItem.description}
                    category={newsItem.category}
                    readTime={newsItem.readTime}
                  />
                </div>
              );
            } else {
              return (
                <NewsCard
                  key={index}
                  imageSrc={newsItem.imageSrc}
                  source={newsItem.source}
                  timeAgo={newsItem.timeAgo}
                  title={newsItem.title}
                  description={newsItem.description}
                  category={newsItem.category}
                  readTime={newsItem.readTime}
                />
              );
            }
          })}
        </div>
      )}

      {/* Display Skeletons while loading */}
      {timelineDataLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NewsSkeleton />
          <NewsSkeleton />
          <NewsSkeleton />
        </div>
      )}
    </section>
  );
};

export default NewsList;
