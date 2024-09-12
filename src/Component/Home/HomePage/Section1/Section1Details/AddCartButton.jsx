const AddCartButton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-7 sm:flex-row sm:gap-6">
      <div>
        <button className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-400 
          px-4 py-2 text-xs sm:text-sm md:text-lg lg:text-lg inline-flex text-white duration-300 
          active:scale-95">
          Add To Cart
        </button>
      </div>

      <div>
        <button className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-400 
          px-4 py-2 text-xs sm:text-sm md:text-lg lg:text-lg inline-flex text-white duration-300 
          active:scale-95">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddCartButton;
