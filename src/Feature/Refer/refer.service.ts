import axiosInstance from "@/lib/axiosInstance";

export const getReferData = async () => {
  return await axiosInstance.get("/referral");
};
