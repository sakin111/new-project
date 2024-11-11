import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const MyCart = () => {
  const { user } = useAuth();
  const email = user?.email;
  const { axiosSecure } = useAxiosSecure();

  // Helper function to retrieve guest cart data from cookies
  // const getGuestCartFromCookie = () => {
  //   const cookies = document.cookie.split(';');
  //   const guestCookie = cookies.find(cookie => cookie.trim().startsWith("guestSession="));
  //   if (guestCookie) {
  //     const guestData = JSON.parse(decodeURIComponent(guestCookie.split('=')[1]));
  //     console.log("Guest Data:", guestData);
  //     return guestData.cart || [];
  //   }
  //   return [];
  // };

  // Fetch cart data based on user's email or guest session
  const { data: myCart, isLoading, error } = useQuery({
    queryKey: ['cartData', email],
    queryFn: async () => {
      if (email) {
        const response = await axiosSecure.get('/addToCart', { params: { email } });
        return response.data;
      } else {
        const response2 = await axiosSecure.get('/addToCartCookies');
        return  response2;
      }
    },
    enabled: !!email || typeof document.cookie !== 'undefined', 
  });

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {error.message}</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {myCart && myCart.length > 0 ? (
        <ul>
          {myCart.map((item, index) => (
            <li key={index}>
              <p>Product: {item.name}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
};

export default MyCart;
