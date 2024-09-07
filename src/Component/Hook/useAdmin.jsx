import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {axiosSecure} = useAxiosSecure(); 
    const { user } = useAuth();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`users/admin/${user?.email}`);
                return res.data?.admin;
            } catch (error) {
                
                console.error("Error fetching admin status:", error);
                return false;
            }
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;