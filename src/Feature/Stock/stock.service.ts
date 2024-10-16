import axiosInstance from "@/lib/axiosInstance";
import { StockPayload } from "./stockSlice";

export const getUserTrackedStocks = async () => {
  return await axiosInstance.get("/subscriptions");
};

export const getStockSuggestion = async (data: { query: string }) => {
  return await axiosInstance.post("/stock/search-stock", data);
};

export const updateStockSubscriptionApi = async (data: StockPayload) => {
  return await axiosInstance.patch("/subscriptions", data);
};
