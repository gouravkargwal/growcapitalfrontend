import axiosInstance from "@/lib/axiosInstance";
import { UpdateNewsTypeDto } from "./news.dto";

export const getAllNewsType = async () => {
  return await axiosInstance.get("/user-news-plan");
};

export const updateUserNewsTypesApi = async (data: UpdateNewsTypeDto) => {
  return await axiosInstance.patch("/user-news-plan", data);
};

export const getSentUserNews = async (page: number, limit?: number) => {
  return await axiosInstance.get(`/stock-news?page=${page}&limit=${limit}`);
};
