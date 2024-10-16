import axiosInstance from "@/lib/axiosInstance";

export const getRewardData = async () => {
  return await axiosInstance.get("/reward");
};
