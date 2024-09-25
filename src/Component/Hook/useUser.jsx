import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = (email) => {
    const { axiosSecure } = useAxiosSecure();

    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ["users", email],  // Keep email in queryKey for caching and refetching
        queryFn: async () => {
            if (!email) return null; // Skip fetching if email is not provided
            try {
                const response = await axiosSecure.get(`/users/${email}`); // Corrected endpoint
                console.log("Fetched user data:", response.data);
                return response.data; // Assuming response.data contains the user object
            } catch (error) {
                console.error("Error fetching user data:", error);
                throw error;
            }
        },
        enabled: !!email, // Only fetch if email is defined
    });

    return { user, isLoading, error, refetch };
};

export default useUser;
