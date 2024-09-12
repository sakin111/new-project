import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Section1TextAnimation from "./Section1TextAnimation";
import Section1Span from "./Section1Span";
import AddCartButton from "./AddCartButton";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

const Section1Details = () => {
  const axiosPublic = useAxiosPublic();
  const formRef = useRef(null);

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const count = form.count.value;
    const imageFront = card.imageFront;
    const price = form.price.value;

    const addInfo = { imageFront, count, price };
    try {
      const mongoResponse = axiosPublic.post("/addToCart", addInfo);
      if (mongoResponse.data.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Room created successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        formRef.current.reset();
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'An error occurred',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const card = useLoaderData();
  const [selectedPrice, setSelectedPrice] = useState(card.size?.[0]?.price || 0);
  const [count, setCount] = useState(0);

  const handleSizeClick = (price) => setSelectedPrice(price);
  const handleAdd = () => setCount((prev) => Math.min(prev + 1, 100));
  const handleReduce = () => setCount((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-white min-h-screen " onSubmit={handleForm} ref={formRef}>
    <div className="flex items-center justify-center gap-6 pt-6 sm:flex-row sm:items-start sm:justify-center md:flex-row md:items-start md:justify-center lg:flex-row lg:items-start lg:justify-center px-4 md:px-10 lg:px-20">
      {/* Image and Description */}
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-full xl:w-2/3 px-2 md:px-4">
        <img
          className="rounded-lg w-full h-auto sm:max-w-[200px] md:max-w-[300px] lg:max-w-[600px]"
          src={card.imageFront}
          alt="card"
        />
        <Section1Span card={card} />
        <div className="w-[200px] md:w-[300px] lg:w-[500px] h-[1px] bg-slate-200 my-7"></div>
        <div className="max-w-[200px] md:max-w-[300px] lg:max-w-[500px]">
          <h3 className="font-banglaFont mb-3 md:mb-4 lg:mb-5 text-cyan-400 text-sm md:text-base lg:text-xl">ডেলিভারী</h3>
          <p className="text-cyan-400 text-xs md:text-xs lg:text-lg font-banglaFont">
            অর্ডার প্লেস করার পর আমাদের একজন কাস্টমার প্রতিনিধি ফোন কলের মাধ্যমে অর্ডারটি কনফার্ম করে নিবে।
            অর্ডার কনফার্ম করার ২-৩ দিনের মধ্যেই সারা বাংলাদেশ হোম ডেলিভারী পেয়ে যাবেন, ইনশাআল্লাহ।
            ডেলিভারী চার্জ = ১০০ টাকা।
          </p>
        </div>
      </div>
  
      {/* Product Details and Actions */}
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 px-2 md:px-4"> 
        <div className="space-y-2 text-center lg:text-left">
          <h2 className="text-lg md:text-xl lg:text-3xl xl:text-4xl font-semibold font-banglaFont textColor1">
            {card.name}
          </h2>
          <p className="textColor1 text-sm md:text-base lg:text-xl font-banglaFont ">{card.title}</p>
          <p className="textColor1 text-md md:text-lg lg:text-2xl">TK {selectedPrice}</p>
        </div>
  
        {/* Size Selection */}
        <div className="my-4 flex flex-wrap justify-center lg:justify-start">
          {card.size?.map((size, index) => (
            <button
              key={index}
              name="price"
              className="mr-2 md:mr-3 mb-2 md:mb-3 rounded-full border border-[#0d87f8] px-2 md:px-3 lg:px-4 py-1 md:py-2 text-xs md:text-sm lg:text-base text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white duration-300"
              onClick={() => handleSizeClick(size.price)}
            >
              {size.count}
            </button>
          ))}
        </div>
  
        {/* Quantity Control */}
        <div className="mt-4 md:mt-5">
          <span className="text-xs md:text-sm textColor1 italic">Quantity</span>
          <div className="mt-3 md:mt-4 flex items-center justify-center lg:justify-start">
            <button className="rounded-full border border-[#0d87f8] px-2 md:px-3 lg:px-4 py-1 md:py-2 text-xs md:text-sm lg:text-base text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white duration-300">
              <span onClick={handleAdd} className="text-base md:text-lg">+</span>
              <span className="mx-3 md:mx-5 lg:mx-7">{count}</span>
              <span onClick={handleReduce} className="text-base md:text-lg">-</span>
            </button>
          </div>
        </div>
  
        {/* Add to Cart Button */}
        <div className="my-8 md:my-10 mx-auto w-full text-center lg:text-left md:text-left sm:text-left">
          <AddCartButton />
        </div>
  
        {/* Product Facts */}
        <div className="my-4 md:my-5">
          <h3 className="lg:text-lg md:text-base mb-2 md:mb-3 textColor1 sm:text-sm">পাওয়ার ফ্যাক্টসঃ</h3>
          <Section1TextAnimation card={card.description}/>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default Section1Details;
