import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useState } from "react";
import {FaRegCopy } from "react-icons/fa6";
import ProductTracking from "../payment/MakeAddress/ProductTracking";





const MyOrder = () => {
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const [copiedId, setCopiedId] = useState(false)
  

    const handleCopy = (order) => {
        if (order._id) {
            navigator.clipboard.writeText(order._id);
            setCopiedId(order._id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const userEmail = user?.email; // Store email in a variable

    const { data: orders, isLoading, isError, error } = useQuery({
        queryKey: ["myOrder", userEmail],
        queryFn: async () => {
            const response = await axiosSecure.get(`/myOrder?email=${userEmail}`);
            return response.data;
        },
        enabled: !!userEmail, // Only fetch if email exists
    });

    if (isError) {
        console.error("Fetch Error:", error);
        return <p className="text-center text-red-500">Error fetching orders: {error.message}</p>;
    }

    if (!user) return <p className="text-center text-gray-500">Loading user data...</p>;
    if (isLoading) return <p className="text-center text-gray-500">Loading orders...</p>;
    if (isError) return <p className="text-center text-red-500">Error fetching orders.
    </p>;
    console.log(orders, "this is orders")

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
           
        <h2 className="text-2xl font-semibold text-center ">My Orders</h2>

        { <ProductTracking />}
   

     
          

            {orders?.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                            <p className="text-gray-700"><strong>Address:</strong> {order.address}</p>
                            <p className="text-gray-700"><strong>Payment:</strong> {order.paymentMethod}</p>


                            <h3 className="text-lg font-medium mt-4 mb-2">Cart Items</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border p-2">Image</th>
                                            <th className="border p-2">Name</th>
                                            <th className="border p-2">Price</th>
                                            <th className="border p-2">Quantity</th>
                                            <th className="border p-2">Order Date</th>
                                            <th className="border p-2">transaction ID</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.cartItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="border p-2">
                                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                                </td>
                                                <td className="border p-2">{item.name}</td>
                                                <td className="border p-2">${item.price}</td>
                                                <td className="border p-2">{item.quantity}</td>
                                                <td className="border p-2"> {new Date(order.orderDate).toLocaleDateString()}</td>
                                                <td className="border p-2">
                                                    {order._id ?? "Missing ID"}
                                                    <button
                                                        onClick={() => handleCopy(order)} // ✅ Fixed
                                                        className="px-2 py-1  text-neutral-700 text-sm rounded"
                                                    >
                                                        {copiedId === order._id ? "Copied!" : <FaRegCopy />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default MyOrder;
