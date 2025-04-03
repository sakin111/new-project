import axios from "axios";

// Determine base URL based on environment
const baseURL = process.env.NODE_ENV === "production"
  ? 'https://omega-2-git-main-maliksakin53gmailcoms-projects.vercel.app/'
  : 'http://localhost:5000';

const axiosSecure = axios.create({
  baseURL,
  withCredentials: true,  // Ensures cookies are sent with requests
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    (config) => {
      // Retrieve the access token and guest session cookie if they exist
      const token = localStorage.getItem('access-token');
      const guestSessionId = document.cookie
        .split('; ')
        .find((row) => row.startsWith('guestSessionId='));

      // Set Authorization header if token exists
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      // Attach the guest session ID as a header if it exists
      if (!token && guestSessionId && config.url === '/guest-specific-endpoint') {
        config.headers['Guest-Session'] = guestSessionId.split('=')[1];
      }
      

      return config;
    },
    (error) => {
      console.error("Request Error:", error);
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || "An error occurred";

      if (status === 401 || status === 403) {
        console.error("Unauthorized or Forbidden access:", message);
        // Handle unauthorized access - maybe redirect to login
        window.location.href = "/login"; // Redirect to login page
      } else if (status === 500) {
        console.error("Server Error:", message);
        // Handle server errors
        alert("An error occurred on the server. Please try again later.");
      } else {
        // For other errors (network issues, etc.)
        console.error("Error Response:", message);
      }
      return Promise.reject(error);
    }
  );

  return { axiosSecure };
};

export default useAxiosSecure;
