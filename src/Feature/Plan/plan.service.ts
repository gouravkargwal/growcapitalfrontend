import axiosInstance from "@/lib/axiosInstance";
import { CouponPayload, PlanPayload } from "./planSlice";

export const getAllPlans = async () => {
  return await axiosInstance.get("/plans");
};

export const getPlansHistory = async () => {
  return await axiosInstance.get("/user-plan/plan-history");
};

export const createPaymentOrderIdApi = async (data: PlanPayload) => {
  return await axiosInstance.post("/payments/create-order", data);
};

export const applyCouponApi = async (data: CouponPayload) => {
  return await axiosInstance.post("/coupons/apply", data);
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
