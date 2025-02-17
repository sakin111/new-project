import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useCookiesData from "../../../Hook/useCookiesData";
import useAuth from "../../../Hook/useAuth";
import OrderCart from "./OrderCart";
import useCart from "../../../Hook/useCart";


const EditAddress = () => {
  const { axiosSecure } = useAxiosSecure();
  const { cartCookies } = useCookiesData(); // Fetch cart data from cookies
  const { cartData} = useCart()
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

const initialCartItems = state?.cartItems || cartCookies || cartData || [];
const [cartItems, setCartItems] = useState(initialCartItems || []);


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useStoredAddress, setUseStoredAddress] = useState(false);
  const [storedAddress, setStoredAddress] = useState({});
  const [storedShip, setStoredShip] = useState("50");

  const addressEndpoint = useMemo(() => 
    user?.email ? "/fetchUserAddress" : "/fetchRealUser", 
    [user]
  );
  

  console.log(user, "this is from edit address")

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      postCode: "",
      phoneNumber: "",
      paymentMethod: "Cash on Delivery",
      shippingZone: "50",
    },
  });



  useEffect(() => {
    const fetchStoredAddress = async () => {
      try {
        if (!user?.email) return;  // Add a check for user.email before making the request
  
        const response = await axiosSecure.get(addressEndpoint, {
          params: { email: user.email }  // Use 'params' to send the email in query string
        });
  
        if (response.data.cookiesAddress) {
          setStoredAddress(response.data.cookiesAddress);
          console.log(response.data.cookiesAddress, "Stored Address");
        }
      } catch (error) {
        console.error(`Error fetching address from ${addressEndpoint}:`, error);
      }
    };
  
    fetchStoredAddress();
  }, [axiosSecure, addressEndpoint, user]);  // Keep dependencies as is
  

  useEffect(() => {
    if (useStoredAddress) {
      setValue("address", storedAddress.address || "");
      setValue("postCode", storedAddress.postCode || "");
      setValue("phoneNumber", storedAddress.phoneNumber || "");
    } else if (!storedAddress.address) {
      reset(); // Reset only if there's no stored address
    }
  }, [useStoredAddress, storedAddress, setValue, reset]);
  

  const prepareOrderData = (formData, items) => ({
    ...formData,
    cartItems: items,
    paymentMethod: formData.paymentMethod,
    shippingZone: formData.shippingZone,
    orderDate: new Date().toISOString(),
});


const onSubmit = async (formData) => {
 
    

  const itemsToSubmit = 
  cartItems?.length
    ? cartItems.map((item) => ({ id: item._id, quantity: item.quantity, size : item.size })) 
    : cartCookies?.length
    ? cartCookies.map((item) => ({ id: item._id, quantity: item.quantity, size : item.size  })) 
    : cartData?.length
    ? cartData.map((item) => ({ id: item._id, quantity: item.quantity, size : item.size  })) 
    : [];

if (!itemsToSubmit.length) {
  Swal.fire("Error", "Your cart is empty!", "error");
  return;
}


    const addressData = {
      address: formData.address,
      postCode: formData.postCode,
      phoneNumber: formData.phoneNumber,
    };

    const orderData = prepareOrderData(formData, itemsToSubmit);

    try {
      const addressUpdateEndpoint = user?.email ? "/addToCart" : "/addCookiesAddress";
      const packageData = user?.email ? { addressData,email:user?.email} : addressData;
      const patchResponse = await axiosSecure.patch(addressUpdateEndpoint, packageData);

      if (!patchResponse.data.success) {
        Swal.fire("Error", "Failed to update address information.", "error");
        return;
      }

      const orderEndpoint = user?.email ? "/myOrder" : "/cookiesOrder";
      const submissionData = user?.email ? orderData : { cookiesOrderData: orderData, addressData };

      const response = await axiosSecure.post(orderEndpoint, submissionData);

      if (response.data.success) {
        reset();
        Swal.fire("Success", "Order placed successfully!", "success");
        navigate("/order-confirmation", { state: { order: response.data.order } });
      } else {
        Swal.fire("Error", response.data.message || "Order failed.", "error");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      Swal.fire("Error", error.response?.data?.message || "An error occurred.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-4 bg-white">
      <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <section className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="address" className="block mb-2">Address:</label>
                <input
                  id="address"
                  {...register("address", { required: "Address is required." })}
                  className="border rounded-lg p-4 w-full"
                />
                {errors.address && <p className="text-red-600">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="postCode" className="block mb-2">Post Code:</label>
                <input
                  id="postCode"
                  {...register("postCode", { required: "Post Code is required." })}
                  className="border rounded-lg p-4 w-full"
                />
                {errors.postCode && <p className="text-red-600">{errors.postCode.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="phoneNumber" className="block mb-2">Phone Number:</label>
                <input
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    required: "Phone Number is required.",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Phone Number must be valid.",
                    },
                  })}
                  className="border rounded-lg p-4 w-full"
                />
                {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
              </div>
            </div>
          </section>

          <section className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Delivery Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="paymentMethod" className="block mb-2">Payment Method:</label>
                <select
                  id="paymentMethod"
                  {...register("paymentMethod")}
                  className="border rounded-lg p-4 w-full"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label htmlFor="shippingZone" className="block mb-2">Shipping Zone:</label>
                <select
                  id="shippingZone"
                  {...register("shippingZone")}
                  className="border rounded-lg p-4 w-full"
                  onChange={(e) => setStoredShip(e.target.value)}
                >
                  <option value="50">Inside Dhaka - 50 TK</option>
                  <option value="80">Outside Dhaka (48 hours) - 80 TK</option>
                  <option value="100">Outside Bangladesh - 100 TK</option>
                </select>
              </div>
            </div>
          </section>

          <div className="mb-4">
            <input
              type="checkbox"
              id="useStoredAddress"
              checked={useStoredAddress}
              onChange={() => setUseStoredAddress(!useStoredAddress)}
            />
            <label htmlFor="useStoredAddress" className="ml-2">
              Proceed with the previous address
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-4 rounded-lg font-semibold text-white ${isSubmitting ? "bg-gray-400" : "bg-teal-600 hover:bg-cyan-500"}`}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <OrderCart storedShip={storedShip} />
      </div>
    </div>
  );
};

export default EditAddress;
