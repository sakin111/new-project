import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";





const useCart = () => {

    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
  
    const { data: cartData =[], error, isLoading, refetch } = useQuery({
      queryKey: ["cartData", user?.email], 
      queryFn: async () => {
        const response = await axiosSecure.get(`/addToCart?email=${user.email}`);
        return response.data;
      },
      enabled: !!user?.email,
      refetchInterval: 1000
      
    });
 

    return {cartData, refetch, error, isLoading}
};

export default useCart;