import axiosInstance from "@/lib/axiosInstance";
import { UpdateNewsTypeDto } from "./news.dto";
import axiosPublicInstance from "@/lib/axiosPublicInstance";

export const getAllNewsType = async () => {
  return await axiosInstance.get("/user-news-plan");
};

export const updateUserNewsTypesApi = async (data: UpdateNewsTypeDto) => {
  return await axiosInstance.patch("/user-news-plan", data);
};

export const getSentUserNews = async (page: number, limit?: number) => {
  return await axiosInstance.get(`/stock-news?page=${page}&limit=${limit}`);
};

export const getNewsById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_URL}/stock-news/${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch news with id: ${id}`);
  }
  const data = await res.json();
  return data;
};
