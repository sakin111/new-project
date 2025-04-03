import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const Checkout = ({ selectedPrice, number, productName, productCategory }) => {
  const { axiosSecure } = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth(); // Retrieves authenticated user
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Fetch user data using useQuery
  const {
    data: userData,
    isLoading,
    isError,

  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;

      try {
        // Ensure email is URL-encoded to handle special characters
        const res = await axiosSecure.get(`/users/email/${encodeURIComponent(user.email)}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error.message || error);
        throw error; // Propagate error to be caught by useQuery
      }
    },
    enabled: !!user?.email, // Only run the query if user.email exists
  });



  // Handle Payment Creation
  const handleCreatePayment = async () => {


    if (isLoading) {
      alert("Loading user data, please wait...");
      return;
    }

    if (isError) {
      alert("Error fetching user data. Please try again later.");
      return;
    }

    // Trim and check for non-empty strings to ensure data integrity
    const hasAddress = userData?.address?.trim().length > 0;
    const hasPhoneNumber = userData?.phoneNumber?.trim().length > 0;
    const hasPostCode = userData?.postCode?.trim().length > 0;

    // Redirect to EditAddress if any required field is missing
    if (!hasAddress) {
      alert("Please provide your address before placing an order.");
      navigate("/editForm");
      return;
    }

    if (!hasPhoneNumber || !hasPostCode) {
      alert("Please ensure your phone number and postcode are provided before placing an order.");
      navigate("/editForm");
      return;
    }

    // All required data exists; proceed with payment creation
    const totalPrice = selectedPrice * number;
    setIsPlacingOrder(true);

    try {
      const res = await axiosSecure.post("/create-payment", {
        totalPrice,
        number,
        productName,
        productCategory,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        postCode: userData.postCode,
      });

      console.log("Payment response:", res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Order Has Been Placed",
          showConfirmButton: false,
          timer: 1500
        });
      }

    } catch (error) {
      console.error("Error creating payment:", error);
      alert("An error occurred while placing your order. Please try again later.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Handle Loading and Error States
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  return (
    <div>
      <button
        onClick={handleCreatePayment}
        disabled={isPlacingOrder}
        className={`rounded-full border-2 border-gray-500 hover:bg-cyan-800 hover:text-white
px-4 py-2 text-xs sm:text-sm md:text-lg lg:text-lg inline-flex text-gray-600 duration-300 
active:scale-95 ${isPlacingOrder ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};


export default Checkout;
