import axios from "axios";

// Determine base URL based on environment
const baseURL = process.env.NODE_ENV === "production" 
    ? 'https://new-project-server-maliksakin53gmailcoms-projects.vercel.app/' 
    : 'http://localhost:5000';

const axiosSecure = axios.create({
    baseURL,
    withCredentials: true,  // Ensures cookies are sent with requests
});

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use((config) => {
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
        if (guestSessionId) {
            config.headers['Guest-Session'] = guestSessionId.split('=')[1];
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            console.error('Unauthorized or Forbidden access');
            // Handle unauthorized access or redirection here if needed
        }
        return Promise.reject(error);
    });

    return { axiosSecure };
};

export default useAxiosSecure;
