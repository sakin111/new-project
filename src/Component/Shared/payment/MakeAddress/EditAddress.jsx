import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure"; // Adjust the path as necessary
import useUser from "../../../Hook/useUser"; // Adjust the path as necessary

const EditAddress = () => {
  const { axiosSecure } = useAxiosSecure();
  const [userData, refetch, isLoading, isError, error] = useUser();

  // Existing state variables
  const [localAddress, setLocalAddress] = useState("");
  const [localPhoneNumber, setLocalPhoneNumber] = useState("");
  const [localPostCode, setLocalPostCode] = useState("");

  // New state variables for checkout
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [shippingZone, setShippingZone] = useState("Zone 1");

  const handleMakeAddress = (e) => {
    e.preventDefault();

    if (!userData?.email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No user found!",
      });
      return;
    }

// add delivery info to the add to cart






    // You might want to add validation for new fields here
    axiosSecure
      .patch(`/users/${userData.email}`, {
        address: localAddress,
        phone: localPhoneNumber,
        postCode: localPostCode,
        method:paymentMethod, 
        Zone:shippingZone,  
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Address and checkout details updated successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes",
            text: "No updates were made.",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to update details",
          text: err.message || "Something went wrong!",
        });
      });
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error loading user data: {error.message}</p>;

  return (
  <div className="bg-white min-h-screen overflow-hidden">
      <div className="edit-address-form max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Checkout</h2>
      <form onSubmit={handleMakeAddress} className="form">
        {/* Address Field */}
        <div className="form-group mb-4">
          <label htmlFor="address" className="block text-gray-600 mb-2">Address:</label>
          <input
            id="address"
            type="text"
            value={localAddress}
            onChange={(e) => setLocalAddress(e.target.value)}
            placeholder="Enter your address"
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Phone Number Field */}
        <div className="form-group mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-600 mb-2">Phone Number:</label>
          <input
            id="phoneNumber"
            type="tel"
            value={localPhoneNumber}
            onChange={(e) => setLocalPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
            pattern="[0-9]{10}" // Example pattern for 10-digit numbers
            title="Enter a valid 10-digit phone number"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Post Code Field */}
        <div className="form-group mb-4">
          <label htmlFor="postCode" className="block text-gray-600 mb-2">Post Code:</label>
          <input
            id="postCode"
            type="text"
            value={localPostCode}
            onChange={(e) => setLocalPostCode(e.target.value)}
            placeholder="Enter your post code"
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Payment Method Selection */}
        <div className="form-group mb-4">
          <label htmlFor="paymentMethod" className="block text-gray-600 mb-2">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            {/* Add more payment methods as needed */}
          </select>
        </div>

        {/* Shipping Zone Selection */}
        <div className="form-group mb-6">
          <label htmlFor="shippingZone" className="block text-gray-600 mb-2">Shipping Zone:</label>
          <select
            id="shippingZone"
            value={shippingZone}
            onChange={(e) => setShippingZone(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="50">Dhaka - (Delivery within 24 hours charge - 50TK)</option>
            <option value="80"> Out Side of Dhaka -  (Delivery within 3-5 days charge - 80TK)</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Submitting..." : "Proceed to Checkout"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default EditAddress;
