import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; 
import useAuth from "./useAuth"; // 

const useUser = () => {
    const { axiosSecure } = useAxiosSecure(); 
    const { user } = useAuth(); 

    // Fetch logged-in user data by email
    const { refetch, data: userData = null, isLoading, isError, error } = useQuery({
        queryKey: ['user', user?.email], 
        queryFn: async () => {
            if (!user?.email) return null; 

            try {
               
                const res = await axiosSecure.get(`/users/email/${encodeURIComponent(user.email)}`);
                return res.data; 
            } catch (error) {
                console.error("Error fetching user data:", error.message || error);
                throw error; 
            }
        },
        enabled: !!user?.email, 
    });

    return [userData, refetch, isLoading, isError, error];
};

export default useUser;
