import axios from "axios";


const baseURL = process.env.NODE_ENV === "production"
  ? 'hhttps://new-project-server-seven.vercel.app/'
  : 'http://localhost:5000';

const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,  // Ensures cookies are sent with requests
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;