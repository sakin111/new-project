import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const { user, isLoading: isAuthLoading } = useAuth()  || {};
    const { axiosSecure } = useAxiosSecure();

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["cartData", user?.email],
        queryFn: async () => {
            if (!user?.email) {
                throw new Error("User email is missing");
            }
            try {
                const res = await axiosSecure.get(`/addToCart/${encodeURIComponent(user.email)}`);
                if (Array.isArray(res.data)) {
                    return res.data;
                } else if (res.data) {
                    return [res.data];
                } else {
                    return [];
                }
            } catch (err) {
                // Handle Axios errors
                if (err.response && err.response.data && err.response.data.message) {
                    throw new Error(err.response.data.message);
                } else if (err.message) {
                    throw new Error(err.message);
                } else {
                    throw new Error("An unknown error occurred");
                }
            }
        },
        enabled: !!user?.email && !isAuthLoading, // Ensure query runs only when user is logged in
        refetchInterval: 300000, // 5 minutes
    });

    const cartData = data ?? [];
    console.log(cartData, "this is cartData hook");

    return [cartData, error, isLoading, refetch];
};

export default useCart;
