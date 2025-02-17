
import { useNavigate } from 'react-router-dom';

const OrderConfirm = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/'); // Redirect to the shop or home page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 text-center ">
        <h1 className="text-2xl font-bold text-green-500 mb-4">🎉 Congratulations! 🎉</h1>
        <p className="text-gray-600 text-lg mb-6">
          Your order has been confirmed successfully! Thank you for shopping with us.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleContinueShopping}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-200"
          >
            View Order Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;



































