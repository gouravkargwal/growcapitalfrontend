import axiosInstance from "@/lib/axiosInstance";

export const getUserPlan = async () => {
  return await axiosInstance.get("/user-plan");
};
