import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useAxiosSecure from "../../Hook/useAxiosSecure";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";
import useCart from "../../Hook/useCart";
import useCookiesData from "../../Hook/useCookiesData";
import useAuth from "../../Hook/useAuth";

const CardOption = () => {
  const { axiosSecure } = useAxiosSecure();
  const {cartData, refetch, total} = useCart();
  const { cartCookies,totalCookie , cookieRefetch } = useCookiesData();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  // Determine cart items based on user authentication status
  const cartItems = useMemo(() => {
    const items = user?.email ? cartData || [] : cartCookies || [];
    return items;
  }, [user?.email, cartData, cartCookies]);
  




  // Calculate the subtotal of cart items
  const subTotal = user?.email? total : totalCookie ;
  
  // Handle item deletion
  const handleDelete = useCallback(
    async (item) => {
      try {
        const result = await Swal.fire({
          title: "Confirm Deletion",
          text: "Are you sure you want to delete this item?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#006400",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          const endpoint = user?.email
            ? `/addToCart/${item._id}`
            : `/addToCartCookies/${item._id}`;

          const response = await axiosSecure.delete(endpoint);

          if (response.data.message === "Product successfully removed from cart") {
            if (user?.email) {
              refetch(); // Refresh cart data for logged-in user
            } else {
              cookieRefetch(); // Refresh cart data for guest user
            }

            Swal.fire("Deleted!", "Item has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete item.", "error");
          }
        }
      } catch (error) {
        console.error("Error deleting the item:", error.message);
        Swal.fire("Error", "Failed to delete item.", "error");
      }
    },
    [axiosSecure, user, refetch, cookieRefetch]
  );

  // Function to handle checkout navigation
  const handleCheckout = useCallback(() => {
    try {
      navigate("/checkout");
    } catch (error) {
      console.error("Navigation to checkout failed:", error);
      Swal.fire("Error", "Failed to navigate to checkout. Please try again.", "error");
    }
  }, [navigate]);

  if(loading){
    return <p>Loading...</p>
  }


  return (
    <div className="min-h-screen bg-white flex flex-col gap-8 p-6">
      {/* Render Cart Table */}
      <CartTable items={cartItems} onDelete={handleDelete} />

      {/* Render Cart Totals if there are cart items */}
      {cartItems.length > 0 ? (
        <CartTotals
          subTotal={subTotal}
          isChecked={isChecked}
          onCheckedChange={() => setIsChecked(!isChecked)}
          onCheckout={handleCheckout}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default CardOption;
