import axiosInstance from "@/lib/axiosInstance";

export const getAllNewsType = async () => {
  return await axiosInstance.get("/user-news-plan");
};

export const updateUserNewsTypesApi = async (data) => {
  return await axiosInstance.patch("/user-news-plan", data);
};
