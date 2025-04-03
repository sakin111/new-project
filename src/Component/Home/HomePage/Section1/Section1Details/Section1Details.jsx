import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Section1Span from "./Section1Span";
import Checkout from "../../../../Shared/payment/Checkout";
import AddCartButton from "../../../../Shared/payment/AddCartButton";

const Section1Details = () => {
  const formRef = useRef(null);
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
    <div className="bg-gray-100 min-h-screen p-6 md:p-10">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10 max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="w-full md:w-1/2 text-center">
          <img
            className="rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg"
            src={card.imageFront}
            alt={card.name}
          />
          <Section1Span card={card} />
        </div>

        {/* Product Info */}
        <div ref={formRef} className="w-full md:w-1/2 space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">{card.name}</h2>
          <p className="text-gray-600">{card.title}</p>
          <p className="text-gray-400 text-sm font-lato">{card.description}</p>
          <p className="text-xl font-bold text-blue-600">Price: $ {selectedPrice}</p>

          {/* Size Selection */}
          <div className="flex flex-wrap gap-2">
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

          {/* Quantity Selection */}
          <div className="flex items-center space-x-4 mt-3">
            <span className="text-sm text-gray-600">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
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

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-5">
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
         
      </div>
      
    </div>
  );
};

export default Section1Details;



