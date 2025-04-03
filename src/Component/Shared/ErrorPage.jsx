import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-5">
      {/* Animated Ghost */}
      <motion.div
        className="relative"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center relative">
          <span className="text-6xl">👻</span>
        </div>
      </motion.div>

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-gray-800 mt-5">Oops! Page Not Found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for doesn’t exist.</p>

      {/* Animated Go Home Button with Blend & Transition */}
      <Link
        to="/"
        className="mt-8 text-lg font-semibold px-8 py-4 rounded-3xl shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white transform transition-all duration-500 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-teal-400 hover:to-yellow-500 hover:via-orange-300 hover:shadow-2xl"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
