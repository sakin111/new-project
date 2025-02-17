import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCookiesData = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: cartCookies = [],
    isLoading,
    isError,
    error,
    refetch: cookieRefetch,
  } = useQuery({
    queryKey: ["cartCookies"],
    queryFn: async () => {
      if (!user?.email) {
        const response = await axiosSecure.get("/addToCartCookies");
        return response.data;
      }
      return []; // Prevent fetching for authenticated users
    },
    enabled: user !== undefined && !user?.email, // Add explicit check for undefined user
  });

  const totalCookie = cartCookies.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return { cartCookies, totalCookie, isLoading, isError, error, cookieRefetch };
};

export default useCookiesData;


