import axiosInstance from "@/lib/axiosInstance";
import { UpdateNewsTypeDto } from "./news.dto";

export const getAllNewsType = async () => {
  return await axiosInstance.get("/user-news-plan");
};

export const updateUserNewsTypesApi = async (data: UpdateNewsTypeDto) => {
  return await axiosInstance.patch("/user-news-plan", data);
};
