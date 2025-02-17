import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useCookiesData from "../../Hook/useCookiesData";

const MyCart = () => {
  const { user } = useAuth();
  const email = user?.email;
  const { axiosSecure } = useAxiosSecure();
  const { cartCookies } = useCookiesData();

  // Fetch cart data based on user's email or guest session
  const { data: myCart, isLoading, error } = useQuery({
    queryKey: ["cartData", email],
    queryFn: async () => {
      if (email) {
        const response = await axiosSecure.get("/addToCart", { params: { email } });
        return response.data;
      } else {
        return cartCookies || [];
      }
    },
    enabled: !!email || !!cartCookies,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-500 animate-pulse">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error loading cart:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">Error loading cart. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 md:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Shopping Cart</h2>

      {myCart && myCart.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {myCart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
              {/* Details */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Category: {item.category}</p>
                <p className="text-sm text-gray-500 mt-1">Zone: {item.zone}</p>
                <p className="text-gray-600 mt-2">💵 Price: ${item.price}</p>
                <p className="text-gray-600">📦 Quantity: {item.quantity}</p>
              </div>
              {/* Address & Method */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-800">Delivery Details</h4>
                <p className="text-sm text-gray-600">Address: {item.address}</p>
                <p className="text-sm text-gray-600">Post Code: {item.postCode}</p>
                <p className="text-sm text-gray-600">Phone: {item.phone}</p>
                <p className="text-sm text-gray-600">Payment: {item.method}</p>
              </div>
              {/* Date */}
              <div className="mt-4 text-xs text-gray-400">
              <p>Order Date: {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-10">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty! Lets fix that.</p>
          <a
            href="/shop"
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-green-500 hover:to-blue-600 transition-all duration-300"
          >
            🛍 Start Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default MyCart;
