import axiosInstance from "@/lib/axiosInstance";

export const getUserPlan = async () => {
  return await axiosInstance.get("/user-plan");
};

export const getUserAccountOverview = async () => {
  return await axiosInstance.get("/users/get-account-overview");
};
