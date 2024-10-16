import axios from "axios";
import { auth } from "./firebase";
import Router from "next/router"; // Import the Next.js Router

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser; // Get the current user
    if (user) {
      const token = await user.getIdToken(); // Retrieve the ID token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response, // Pass the response if successful
  async (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized error, log out the user
      await auth.signOut(); // Log out the user from Firebase
    }
    return Promise.reject(error); // Pass the error for further handling
  }
);

export default axiosInstance;
