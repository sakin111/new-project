import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";



const AddCartButton = ({ selectedPrice, number , imageFront,productCategory,productName , email}) => {

  const { axiosSecure } = useAxiosSecure()

 
  const handleAddToCart = async () => {


      console.log(selectedPrice, number,imageFront,productCategory,productName)

        const addInfo = { 
          price: selectedPrice ,
          quantity:number,
          image:imageFront,
          category:productCategory,
          name:productName ,
          email:email
         };
        try {
          const response = await axiosSecure.post("/addToCart", addInfo);
          if (response.data.insertedId) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'cart added successfully',
              showConfirmButton: false,
              timer: 1500,
            });

          }
        } catch (error) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'An error occurred',
            text: error.message || "Something went wrong. Please try again later.",
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
      >Add to Cart
      </button>
    </div>
  );
};

export default AddCartButton;