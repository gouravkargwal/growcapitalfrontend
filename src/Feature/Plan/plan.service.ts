import axiosInstance from "@/lib/axiosInstance";
import { PlanPayload } from "./planSlice";

export const getAllPlans = async () => {
  return await axiosInstance.get("/plans");
};

export const createPaymentLinkApi = async (data: PlanPayload) => {
  return await axiosInstance.post("/payments/create-link", data);
};

export const checkPaymentStatusApi = async (
  data: string,
  signal?: AbortSignal
) => {
  try {
    const res = await axiosInstance.get(`/payments/status/${data}`, {
      signal,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
