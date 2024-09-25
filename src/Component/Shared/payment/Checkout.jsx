import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useUserStore from "../../Store/Store";

const Checkout = ({ selectedPrice, number }) => {
  
  const { axiosSecure } = useAxiosSecure();
  const navigate = useNavigate();
  const { address, phoneNumber, postCode } = useUserStore();

  // Debugging: Ensure you have correct values from Zustand store
  console.log("Zustand State in Checkout:", { address, phoneNumber, postCode });

  // Handle Payment Creation
  const handleCreatePayment = async () => {
    // Debugging line to check values before placing order
    console.log("Placing Order with:", selectedPrice, number, address, phoneNumber, postCode);

    if (!address) {
      // If no address is found, navigate to the address form
      navigate("/address");
      return;
    }

    // Proceed with payment if address exists
    const totalPrice = selectedPrice * number;
    try {
      const res = await axiosSecure.post("/create-payment", {
        totalPrice,
        number,
        phoneNumber,
        postCode,
      });

      console.log("Payment response:", res.data); // Debugging line to check payment response
      return res.data;
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={handleCreatePayment}
          className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-400 px-4 py-2 text-xs sm:text-sm md:text-lg lg:text-lg inline-flex text-white duration-300 active:scale-95"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
