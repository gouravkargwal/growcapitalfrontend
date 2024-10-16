import axiosInstance from "@/lib/axiosInstance";
import { PlanPayload } from "./planSlice";

export const getAllPlans = async () => {
  return await axiosInstance.get("/plans");
};

export const updateUserPlanApi = async (data: PlanPayload) => {
  return await axiosInstance.post("/user-plan/buy", data);
};
