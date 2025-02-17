import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useParams } from "react-router-dom";

const useCookiesSingle = () => {
  const { axiosSecure } = useAxiosSecure(); // Custom hook for secure Axios instance
  const { id } = useParams(); // Retrieve `id` from the route params

  // React Query to fetch single cookie by ID
  const { data: singleCookies, refetch, isError, error, isLoading } = useQuery({
    queryKey: ["cookiesSingle", id], // Unique query key with `id`
    queryFn: async () => {
      if (!id) {
        throw new Error("No ID provided for fetching cookies"); // Handle missing ID
      }
      // Make GET request to backend with ID
      const response = await axiosSecure.get(`/addToCartCookies/${id}`);
      if (!response.data) {
        throw new Error("Cookie not found in the server response"); // Handle no data case
      }
      return response.data; // Return the fetched data
     
    },
    
    enabled: !!id, // Run query only if `id` exists
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
    cacheTime: 10 * 60 * 1000, // Retain cache for 10 minutes
    retry: 1, // Retry only once on failure
    onError: (error) => {
      console.error("Error fetching single cookie:", error.message || error); // Log any error
    },
  });

  // Debugging log (only for development mode)
  if (import.meta.env.MODE === "development") {
    console.log(singleCookies ?? "No data yet", "this is singleCookies from hook");
  }
  

  return { singleCookies, refetchSingleCookies:  refetch, isError, error, isLoading };
};

export default useCookiesSingle;
