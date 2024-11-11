import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCookiesData = () => {
  const { axiosSecure } = useAxiosSecure();

  const { data: cartCookies = [], isLoading, isError, error } = useQuery({
   queryKey: ["cartCookies"],   // Query key for caching
   queryFn:  async () => {
      const response = await axiosSecure.get("/addToCartCookies");
      return response.data;
    },
     
    staleTime: 5 * 60 * 1000,  // Optional: Cache data for 5 minutes
    cacheTime: 10 * 60 * 1000,  // Optional: Cache in background for 10 minutes
    retry: 1,  // Retry once on failure
  });

  

  return { cartCookies, isLoading, isError, error };
};

export default useCookiesData;
