import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const {axiosSecure} = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: cartData = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/addToCart?email=${user.email}`);
            return res.data;
        },
        enable: !!user?.email
    })

     
    const total = cartData.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), // Multiply by quantity if present
  0);


    return {cartData, refetch,total} ;
};

export default useCart;