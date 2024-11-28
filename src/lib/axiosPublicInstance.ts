import axios from "axios";

const axiosPublicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_URL,
  timeout: 10000,
});

export default axiosPublicInstance;
