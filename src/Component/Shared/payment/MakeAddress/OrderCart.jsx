// import { RiDeleteBinLine } from "react-icons/ri";

import useCookiesData from "../../../Hook/useCookiesData";
import useCart from "../../../Hook/useCart";
import useAuth from "../../../Hook/useAuth";
import PropTypes from "prop-types";

const OrderCart = ({storedShip}) => {
  const { cartCookies } = useCookiesData(); // Fetch cart data from cookies
  const {cartData} = useCart()
  const {user} = useAuth()



   const cartItems = user?.email? cartData : cartCookies

  // Calculate Subtotal
  const subtotal = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <div className="w-full md:w-full px-12">
      {/* ... rest of your component ... */}

      <div className="mt-8">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className="text-right font-medium pr-4">Subtotal:</td>
              <td className="text-right font-medium">${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="text-right font-medium pr-4">Shipping:</td>
              <td className="text-right font-medium">$ {storedShip}</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="text-right font-bold pr-4">Total:</td>
              <td className="text-right font-bold">${(subtotal + (Number(storedShip) || 0)).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

OrderCart.propTypes = {
  storedShip: PropTypes.string.isRequired
}

export default OrderCart;