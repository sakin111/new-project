import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useUser from "../../../Hook/useUser";
import { useNavigate } from "react-router-dom";
import useSingle from "../../../Hook/useSingle";
import useCookiesData from "../../../Hook/useCookiesData";

const EditAddress = () => {
  const { axiosSecure } = useAxiosSecure();
  const { userData, refetch, isLoading, isError, error } = useUser();
  const [cartItem, isCartLoading] = useSingle();
  const { cartCookies } = useCookiesData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    postCode: "",
    phoneNumber: "",
    paymentMethod: "Cash on Delivery",
    shippingZone: "50",
  });

  const isFormInitialize = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkUser = () => {
    if (!userData?.email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No user found! Please log in.",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (userData && !isFormInitialize.current) {
      setFormData((prevData) => ({
        ...prevData,
        address: userData.address || "",
        postCode: userData.postCode || "",
        phoneNumber: userData.phone || "",
      }));
      isFormInitialize.current = true;
    }
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkUser() || !cartItem || !cartCookies) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Missing cart or cookie data.",
      });
      return;
    }

    setIsSubmitting(true);

    const cookiesItem = {
      products: {
        id: cartCookies._id,
        name: cartCookies.name,
        price: cartCookies.price,
        quantity: cartCookies.quantity,
        image: cartCookies.image,
        category: cartCookies.category,
      },
      address: formData.address,
      postCode: formData.postCode,
      phone: formData.phoneNumber,
      method: formData.paymentMethod,
      zone: formData.shippingZone,
      date: new Date(),
    };

    const myOrder = {
      userEmail: userData.email,
      products: {
        id: cartItem._id,
        name: cartItem.name,
        price: cartItem.price,
        quantity: cartItem.quantity,
        image: cartItem.image,
        category: cartItem.category,
      },
      address: formData.address,
      postCode: formData.postCode,
      phone: formData.phoneNumber,
      method: formData.paymentMethod,
      zone: formData.shippingZone,
      date: new Date(),
    };

    try {
      const updateRes = await axiosSecure.patch(`/users/${userData.email}`, {
        address: formData.address,
        postCode: formData.postCode,
        phoneNumber: formData.phoneNumber,
      });

      if (updateRes.data.modifiedCount > 0) {
        refetch();
      }

      const cookiesOrderRes = await axiosSecure.post("/OrderCookies", cookiesItem);
      const myOrderRes = await axiosSecure.post("/myOrder", myOrder);

      if (cookiesOrderRes.data.success && myOrderRes.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order placed successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        navigate("/");
      } else {
        Swal.fire({
          icon: "info",
          title: "Order Info",
          text: cookiesOrderRes.data.message || "Order could not be completed.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: err.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isCartLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-center text-red-500">Error loading user data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="edit-address-form max-w-4xl w-full bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {userData.address ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Saved Contact Information</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Address:</span> {userData.address}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Post Code:</span> {userData.postCode}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone Number:</span> {userData.phone}
                </p>
              </div>
            </div>
          ) : (
            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="address" className="block text-gray-600 mb-2">Address:</label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                    className="border border-gray-300 rounded-lg p-4 w-full"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postCode" className="block text-gray-600 mb-2">Post Code:</label>
                  <input
                    id="postCode"
                    type="text"
                    value={formData.postCode}
                    onChange={handleChange}
                    placeholder="Enter your post code"
                    required
                    className="border border-gray-300 rounded-lg p-4 w-full"
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label htmlFor="phoneNumber" className="block text-gray-600 mb-2">Phone Number:</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    pattern="[0-9]{11}"
                    title="Enter a valid 11-digit phone number"
                    className="border border-gray-300 rounded-lg p-4 w-full"
                  />
                </div>
              </div>
            </section>
          )}

          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Delivery Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="paymentMethod" className="block text-gray-600 mb-2">Payment Method:</label>
                <select
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-4 w-full"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="shippingZone" className="block text-gray-600 mb-2">Shipping Zone:</label>
                <select
                  id="shippingZone"
                  value={formData.shippingZone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-4 w-full"
                >
                  <option value="50">Inside Bangladesh - (Delivery within 2-3 days charge - 50TK)</option>
                  <option value="80">Inside Bangladesh - (Delivery within 48 hours charge - 80TK)</option>
                  <option value="100">Outside of Bangladesh - (Delivery within 7-14 days charge - 100TK)</option>
                </select>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-4 rounded-lg font-semibold text-white ${isSubmitting ? "bg-gray-400" : "bg-teal-600 hover:bg-cyan-500"}`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
