import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiCreditCard, FiMapPin, FiPhone, FiShoppingBag } from "react-icons/fi";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useCookiesData from '../../../Hook/useCookiesData';
import useAuth from '../../../Hook/useAuth';
import OrderCart from './OrderCart';
import useCart from '../../../Hook/useCart';

const EditAddress = () => {
  const { axiosSecure } = useAxiosSecure();
  const { cartCookies } = useCookiesData();
  const { cartData } = useCart();
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartItems = useMemo(() => {
    return state?.cartItems || cartData || cartCookies || [];
  }, [state?.cartItems, cartData, cartCookies]);

 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useStoredAddress, setUseStoredAddress] = useState(false);
  const [storedAddress, setStoredAddress] = useState({});
  const [storedShip, setStoredShip] = useState("50");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const addressEndpoint = useMemo(() =>
    user?.email ? "/fetchRealUser" : "/fetchUserAddress",
    [user]
  );

  console.log(cartData," this is cart data")

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
      shippingZone: "10",
    },
  });

  const fetchStoredAddress = useCallback(async () => {
    try {
      if (!user?.email) return;

      const response = await axiosSecure.get(addressEndpoint, {
        params: { email: user.email }
      });

      const address = response.data.addressData || response.data.cookiesAddress;

      if (address) {
        setStoredAddress(address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      Swal.fire('Error', 'Failed to load saved address', 'error');
    }
  }, [axiosSecure, addressEndpoint, user]);

  useEffect(() => {
    fetchStoredAddress();
  }, [fetchStoredAddress]);

  useEffect(() => {
    if (useStoredAddress) {
      setValue("address", storedAddress.address || "");
      setValue("postCode", storedAddress.postCode || "");
      setValue("phoneNumber", storedAddress.phoneNumber || "");
    } else if (!storedAddress.address) {
      reset();
    }
  }, [useStoredAddress, storedAddress, setValue, reset]);

  const prepareOrderData = useCallback((formData, items) => ({
    ...formData,
    cartItems: items,
    paymentMethod: formData.paymentMethod,
    shippingZone: formData.shippingZone,
    orderDate: new Date().toISOString(),
  }), []);

  const onSubmit = async (formData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const itemsToSubmit = cartItems.map(item => ({
      id: item._id,
      quantity: item.quantity,
      size: item.size,
      image: item.image,
      name: item.name,
      price: item.price,
      category: item.category,
      email: item.email
    }));
    console.log(itemsToSubmit);

    if (!itemsToSubmit.length) {
      Swal.fire("Error", "Your cart is empty!", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const addressData = {
        address: formData.address,
        postCode: formData.postCode,
        phoneNumber: formData.phoneNumber,
      };

      const orderData = prepareOrderData(formData, itemsToSubmit);
      const addressUpdateEndpoint = user?.email ? "/addToCart" : "/addCookiesAddress";
      const packageData = user?.email ? { addressData, email: user?.email } : addressData;

      await axiosSecure.patch(addressUpdateEndpoint, packageData);

      const orderEndpoint = user?.email ? "/myOrder" : "/cookiesOrder";
      const submissionData = user?.email ? orderData : { cookiesOrderData: orderData, addressData };

      const response = await axiosSecure.post(orderEndpoint, submissionData);

      if (response.data.success) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "Your order has been placed successfully",
          icon: "success",
          confirmButtonColor: "#14B8A6"
        });
        navigate("/order-confirmation", { state: { order: response.data.order } });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to place order. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Secure Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FiMapPin className="w-5 h-5 text-teal-600" />

                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    {...register("address", { required: "Address is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Post Code
                  </label>
                  <input
                    {...register("postCode", { required: "Post code is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter post code"
                  />
                  {errors.postCode && (
                    <p className="text-red-500 text-sm">{errors.postCode.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      className="w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FiCreditCard className="w-5 h-5 text-teal-600" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <select
                    {...register("paymentMethod")}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Card Payment">Card Payment</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <select
                    {...register("shippingZone")}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    onChange={(e) => setStoredShip(e.target.value)}
                  >
                    <option value="20">Inside the country - $20</option>
                    <option value="50">Outside country - $50</option>
                  </select>
                </div>
              </div>
            </div>

            {paymentMethod === "Card Payment" && (
              <div className="mt-4">
                <Link to="/cardPay" className="text-teal-600 underline">
                  Proceed to Card Payment
                </Link>
              </div>
            )}

            <div className="flex items-center gap-2 my-4">
              <input
                type="checkbox"
                id="useStoredAddress"
                checked={useStoredAddress}
                onChange={() => setUseStoredAddress(!useStoredAddress)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <label htmlFor="useStoredAddress" className="text-sm text-gray-700">
                Use saved address
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors
                ${isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">

                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FiShoppingBag className="w-5 h-5" />
                  <span>Place Order</span>
                </div>
              )}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <OrderCart storedShip={storedShip} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;