import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'http://localhost:5000'
    // baseURL:'https://new-project-server-maliksakin53gmailcoms-projects.vercel.app/'
 
});


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;