// useUser.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; 
import useAuth from "./useAuth"; 

const useUser = () => {
    const { axiosSecure } = useAxiosSecure(); 
    const { user } = useAuth(); 

    // Fetch logged-in user data by email
    const { data, refetch, isLoading, isError, error } = useQuery({
        queryKey: ['user', user?.email], 
        queryFn: async () => {
            if (!user?.email) return null; 

            try {
                const res = await axiosSecure.get(`/users/email/${encodeURIComponent(user.email)}`);
                // Assuming the API returns a single user object
                return Array.isArray(res.data) ? res.data[0] : res.data;
            } catch (error) {
                console.error("Error fetching user data:", error.message || error);
                throw error; 
            }
        },
        enabled: !!user?.email, 
    });

    const userData = data ?? {}; // Default to an empty object if data is null


    return { userData, refetch, isLoading, isError, error };
};

export default useUser;
