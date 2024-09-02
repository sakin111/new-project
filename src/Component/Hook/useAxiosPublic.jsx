import axios from "axios";

const checkLocalhost = async () => {
  try {
    // Try to ping the localhost server
    await axios.get("http://localhost:5000");
    return "http://localhost:5000";
  } catch (error) {
    // If the localhost server is not reachable, fall back to the production URL
    return "https://new-project-server-l5jy9b984-maliksakin53gmailcoms-projects.vercel.app/";
  }
};

const createAxiosInstance = async () => {
  const baseURL = await checkLocalhost();
  return axios.create({
    baseURL: baseURL,
  });
};

const useAxiosPublic = async () => {
  const axiosInstance = await createAxiosInstance();
  return axiosInstance;
};

export default useAxiosPublic;
