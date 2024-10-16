import { GoogleAuthData, SignupData } from "./auth.dto";

import axiosInstance from "@/lib/axiosInstance";

export const signupService = async (userData: SignupData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAuthService = async (token: GoogleAuthData) => {
  return await axiosInstance.post("/auth/google-auth", token);
};

export const verifyEmailService = async (userId: string) => {
  try {
    const response = await axiosInstance.post("/auth/verify-email", { userId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyTokenService = async (token: string) => {
  return await axiosInstance.post("/auth/verify-token", { token });
};
