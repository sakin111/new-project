import axios from "axios";





const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL:'https://new-project-server-hvl1awoyf-maliksakin53gmailcoms-projects.vercel.app/',
    withCredentials:true,
});

const useAxiosSecure = () => {

axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    console.log('Token:', token); 
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosSecure.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const status = error.response.status;
    if (status === 401 || status === 403) {
        console.log('Access denied');
        
    }
    return Promise.reject(error);
});

return {axiosSecure}



};

export default useAxiosSecure;