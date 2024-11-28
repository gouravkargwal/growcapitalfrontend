import React from "react";
import { notFound } from "next/navigation";
import { getNewsById } from "@/Feature/News/news.service";

interface NewsDetailProps {
  params: { id: string }; // This matches the route segment `[id]`
}

const NewsDetail = async ({ params }: NewsDetailProps) => {
  const { id } = params;

  let newsDetail: any = null;
  try {
    const { data } = await getNewsById(id);
    console.log(data);

    newsDetail = await data?.data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
  }

  if (!newsDetail) {
    notFound(); // Renders a 404 page if news is not found
  }

  return (
    <div className="news-detail">
      <h1 className="text-2xl font-bold">{newsDetail.title}</h1>
      <p className="mt-4">{newsDetail.content}</p>
    </div>
  );
};

export default NewsDetail;

export const dynamicParams = true; // Set to false if the route is statically generated
