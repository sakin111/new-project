import axios from "axios";
import { useMemo } from "react";

const createAxiosInstance = () => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
    (response) => {
      // If the response is successful, return it
      return response;
    },
    async (error) => {
      // If the request fails and it's a network error, switch to production URL
      if (error.code === "ERR_NETWORK") {
        axiosInstance.defaults.baseURL = "https://new-project-server-l5jy9b984-maliksakin53gmailcoms-projects.vercel.app/";
        try {
          // Retry the request with the production URL
          return await axiosInstance.request(error.config);
        } catch (retryError) {
          return Promise.reject(retryError);
        }
      }
      return Promise.reject(error);
    }
  );

  // Initially, try to use localhost
  axiosInstance.defaults.baseURL = "http://localhost:5000";

  return axiosInstance;
};

const useAxiosPublic = () => {
  const axiosInstance = useMemo(() => createAxiosInstance(), []);
  return axiosInstance;
};

export default useAxiosPublic;

