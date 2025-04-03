import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useProductItem = () => {


    const axiosPublic = useAxiosPublic();

    const { data = [], isLoading, error } = useQuery({
        queryKey: ['card'],
        queryFn: async () => {
            try {
                const response = await axiosPublic.get('/card');
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        }
    });

    return [data, isLoading, error];
   
};

export default useProductItem;