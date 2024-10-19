import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useParams } from "react-router-dom";


const useSingle = () => {
 
const {axiosSecure} = useAxiosSecure()
const {user} =  useAuth()
const {id} = useParams()

 
  const { data: cartItem, isLoading: isCartLoading } = useQuery({
    queryKey: ['cartItem', user?.email], // Unique query key for the cart item
    queryFn: async () => {
      if (!user?.email) return null; // Ensure `userData` is available
      try {
        const response = await axiosSecure.get(`/addToCart/${id}/${encodeURIComponent(user.email)}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching cart item:", error);
        throw error;
      }
    },
    enabled: !!user?.email, // Only fetch when `userData` is available
  });


 return [ cartItem,isCartLoading]
}

export default useSingle;