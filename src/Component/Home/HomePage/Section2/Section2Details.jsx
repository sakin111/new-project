import {  useState } from "react";
import { useLoaderData } from "react-router-dom";
// import Section1TextAnimation from "../Section1/Section1Details/Section1TextAnimation"
import Section1Span from "../Section1/Section1Details/Section1Span";
import Checkout from "../../../Shared/payment/Checkout";
import AddCartButton from "../../../Shared/payment/AddCartButton";




const Section2Details = () => {


  const card = useLoaderData();
 
const [selectedPrice, setSelectedPrice] = useState(card.size?.[0]?.price || 0);
  const [selectedSize, setSelectedSize] = useState(card.size?.[0]?.variant || "");
   const [quantity, setQuantity] = useState(1);

   const handleSizeClick = (price, variant) => {
    setSelectedPrice(price);
    setSelectedSize(variant);
  };
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? Math.min(prev + 1, 100) : Math.max(prev - 1, 1)));
  };




  return (
    <div className="bg-white min-h-screen px-4">
      <div className="flex flex-col items-center justify-center gap-6 pt-6 lg:flex-row lg:items-start lg:justify-center lg:px-1 xl:px-24">
        {/* Image and Description */}
        <div className="w-full lg:w-full xl:w-2/3 px-2 md:px-4">
              {/* Product Image */}
                 <div className="w-full md:w-1/2 text-center">
                   <img
                     className="rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg"
                     src={card.imageFront}
                     alt={card.name}
                   />
                   <Section1Span card={card} />
                 </div>
          <Section1Span card={card} />
          <div className="w-full h-[1px] bg-slate-200 my-7"></div>
          <div className="max-w-[500px]">
            <h3 className="font-banglaFont mb-5 text-cyan-400 ml-3">ডেলিভারী</h3>
            <p className="text-cyan-400 text-lg font-banglaFont ml-3">
              অর্ডার প্লেস করার পর আমাদের একজন কাস্টমার প্রতিনিধি ফোন কলের মাধ্যমে অর্ডারটি কনফার্ম করে নিবে।
              অর্ডার কনফার্ম করার ২-৩ দিনের মধ্যেই সারা বাংলাদেশ হোম ডেলিভারী পেয়ে যাবেন, ইনশাআল্লাহ।
              ডেলিভারী চার্জ = ১০০ টাকা।
            </p>
          </div>
        </div>

        {/* Details Section */}

        <div className="min-w-[600px] rounded-br-lg rounded-tr-lg px-10 text-start md:w-[350px]">
          <div className="space-y-1">
            <h2 className="text-start text-3xl font-semibold font-custom font-banglaFont textColor1 lg:text-5xl">
              {card.name}
            </h2>
            <p className="textColor1 text-xl font-banglaFont py-2">{card.title}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="space-y-1 my-3">
              <p className="textColor1 text-2xl">
                TK {selectedPrice !== null ? selectedPrice : card.size[0].price}
              </p>
            </div>
          </div>
          <div className="my-4">
          {card.size?.map((size, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSize === size.variant
                    ? "bg-blue-600 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
                onClick={() => handleSizeClick(size.price, size.variant)}
              >
                {size.variant}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <span className="text-sm textColor1 italic">Quantity</span>
            <div className="mt-6">
            <button
                className="px-4 py-2 bg-gray-200 text-gray-700"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </button>
              <span className="px-6 py-2 text-gray-900">{quantity}</span>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div>
          </div>
          <div className="my-8 md:my-10 mx-auto w-full text-center lg:text-left md:text-left sm:text-left">

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-7 sm:flex-row sm:gap-6">
                     <AddCartButton
                       _id={card._id}
                       selectedPrice={parseInt(selectedPrice)}
                       productName={card.name}
                       number={quantity}
                       imageFront={card.imageFront}
                       productCategory={card.category}
                       size={selectedSize}
                     />
                     <Checkout
                       selectedPrice={parseInt(selectedPrice)}
                       productName={card.name}
                       number={quantity}
                       imageFront={card.imageFront}
                       productCategory={card.category}
                     />
            </div>

          </div>
          <div className="my-5">
            <h3 className="text-2xl mb-3 textColor1">পাওয়ার ফ্যাক্টসঃ</h3>
            {/* <Section1TextAnimation card={card.description} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2Details;
