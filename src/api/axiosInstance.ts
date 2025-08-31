import { BASE_API_URL, STRAPI_API_KEY } from "@/constants/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${STRAPI_API_KEY}`,
  },
});

export default axiosInstance;
