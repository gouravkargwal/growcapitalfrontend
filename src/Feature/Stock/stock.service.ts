import axiosInstance from "@/lib/axiosInstance";

export const getUserTrackedStocks = async () => {
  return await axiosInstance.get("/subscriptions");
};

export const getStockSuggestion = async (data: { query: string }) => {
  return await axiosInstance.post("/stock/search-stock", data);
};

export const updateStockSubscriptionApi = async (data) => {
  return await axiosInstance.patch("/subscriptions", data);
};
