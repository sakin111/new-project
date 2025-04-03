import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import PropTypes from "prop-types";

const AddCartButton = ({ selectedPrice, number, imageFront, productCategory, productName, size,_id }) => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    console.log(selectedPrice, number, imageFront, productCategory, productName,size,_id);
 

    const addInfo = {
      _id: _id,
      price: selectedPrice,
      size:size,
      quantity: number,
      image: imageFront,
      category: productCategory,
      name:productName, 
      email:user.email 
    };
   


    try {
    let response;
    if (user?.email) {
      response = await axiosSecure.post("/addToWishlist", {email:user.email,addInfo});
      

    } else {
      response = await axiosSecure.post("/addToCartCookies", {addInfo});
    }
      // Handle success notification
      if (response.data.message) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "cart added successfully",
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
        className="rounded-full border-2 border-gray-500 hover:bg-cyan-800 hover:text-white
                  px-4 py-2 text-xs sm:text-sm md:text-lg lg:text-lg inline-flex text-gray-600 duration-300 
                  active:scale-95"
      >
        Add to Cart
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
