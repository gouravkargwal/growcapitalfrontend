import axiosInstance from "@/lib/axiosInstance";

export const getAllPlans = async () => {
  return await axiosInstance.get("/plans");
};

export const updateUserPlanApi = async (data) => {
  return await axiosInstance.post("/user-plan/buy", data);
};
