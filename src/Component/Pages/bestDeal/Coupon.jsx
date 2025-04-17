import { Link } from "react-router-dom";


const Coupon = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center min-h-screen  bg-gray-900 text-white py-16 px-6 rounded-lg shadow-lg max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Exclusive Coupons</h2>
        <p className="text-lg text-gray-400 mb-6">This deal is not available yet. Stay tuned!</p>
        <Link
      
          to="/shop"
          className="relative px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-transform transform hover:scale-105"
          style={{ mixBlendMode: "screen" }}
        >
          Back to Shop
        </Link>
      </div>
    );
};

export default Coupon;
  