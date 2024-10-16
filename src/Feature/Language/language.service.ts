import axiosInstance from "@/lib/axiosInstance";

export const getAllLanguages = async () => {
  return await axiosInstance.get("/language");
};

export const getUserAndAllLanguages = async () => {
  return await axiosInstance.get("/user-language");
};

export const updateUserLanguageApi = async (data) => {
  return await axiosInstance.put("/user-language", data);
};
