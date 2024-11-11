import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import PropTypes from "prop-types";

const AddCartButton = ({ selectedPrice, number, imageFront, productCategory, productName }) => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    console.log(selectedPrice, number, imageFront, productCategory, productName);

    const addInfo = {
      price: selectedPrice,
      quantity: number,
      image: imageFront,
      category: productCategory,
      name:productName,  
    };
   
    // ...(user?.email && { email: user.email }),

    try {
    let response;
    if (user?.email) {
      response = await axiosSecure.post("/addToCart", {email:user?.email,addInfo});
    } else {
      response = await axiosSecure.post("/addToCartCookies", {addInfo});
    }
  
      // Handle success notification
      if (response.data.message) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'An error occurred',
        text: error.response?.data?.message || "Something went wrong. Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-400 
                  px-4 py-2 text-xs sm:text-sm md:text-lg lg:text-lg inline-flex text-white duration-300 
                  active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
};

AddCartButton.propTypes = {
  selectedPrice: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  imageFront: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
};

export default AddCartButton;
