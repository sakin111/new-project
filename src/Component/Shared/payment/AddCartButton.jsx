import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddCartButton = ({ selectedPrice, number, imageFront, productCategory, productName, size, _id }) => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleAddToCart = async () => {
    // If user is not logged in, redirect to login
    if (!user?.email) {
      navigate("/login");
      return;
    }

    const addInfo = {
      _id: _id, // Changed _id to productId for better naming
      price: selectedPrice,
      size: size,
      quantity: number,
      image: imageFront,
      category: productCategory,
      name: productName,
      email: user.email,
    };

    try {
      setIsLoading(true); // Start loading

      const response = await axiosSecure.post("/addToWishlist", {
        email: user.email,
        addInfo,
      });

      if (response.data.message) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cart added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred",
        text: error?.response?.data?.message || error?.message || "Something went wrong. Please try again later.",
        showConfirmButton: true,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`rounded-full border-2 border-gray-500 hover:bg-cyan-800 hover:text-white
          px-4 py-2 text-xs sm:text-sm md:text-lg lg:text-lg inline-flex text-gray-600 duration-300 
          active:scale-95 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

AddCartButton.propTypes = {
  selectedPrice: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  imageFront: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
};

export default AddCartButton;
