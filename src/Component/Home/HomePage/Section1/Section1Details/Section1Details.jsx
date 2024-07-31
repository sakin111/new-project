
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Section1TextAnimation from "./Section1TextAnimation";
import Section1Span from "./Section1Span";


const Section1Details = () => {

  const card = useLoaderData()
  console.log(card, "card item")

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [count, setCount] = useState(0)

  const handleSizeClick = (price) => {
    setSelectedPrice(price);
  };

  const handleAdd = () => {
    if (count < 100) {
      setCount(count + 1)
    }
  }
  const handleReduce = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }


  return (
    <div className="bg-white  min-h-screen min-w-max">
      <div className="flex flex-col items-start justify-center gap-4 pt-6 md:flex-row">
        <div className="">
          <img width={700} height={800} className=" rounded-lg " src={card.imageFront} alt="card" />
          <Section1Span card={card}></Section1Span>
          <div className="w-2/3 h-[1px] bg-slate-200 my-3 mt-7 ml-7"></div>
          <div className="max-w-[500px] ml-7 mt-4">
            <h3 className="font-banglaFont mb-5 text-cyan-400 ml-3">ডেলিভারী</h3>
            <p className="text-cyan-400 text-lg font-banglaFont ml-3">অর্ডার প্লেস করার পর আমাদের একজন কাস্টমার প্রতিনিধি ফোন কলের মাধ্যমে অর্ডারটি কনফার্ম করে নিবে।
              অর্ডার কনফার্ম করার ২-৩ দিনের মধ্যেই সারা বাংলাদেশ হোম ডেলিভারী পেয়ে যাবেন, ইনশাআল্লাহ।
              ডেলিভারী চার্জ = ১০০ টাকা।</p>
          </div>


        </div>


        <div className="min-w-[600px]   rounded-br-lg rounded-tr-lg px-10 text-start md:w-[350px] ">
          <div className="space-y-1">
            <h2 className="text-start text-3xl font-semibold  font-custom font-banglaFont  textColor1 lg:text-5xl">{card.name}</h2>
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
            {card.size.map((size, index) => (

              <button
                key={index}

                className="mr-3 rounded-full border border-[#0d87f8] px-4 py-2 text-base text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white duration-300 dark:hover:bg-transparent dark:hover:text-[#0d87f8] dark:hover:drop-shadow-[0px_0px_2px_#0d87f8] font-medium"
                onClick={() => handleSizeClick(size.price)}
              >
                {size.count}
              </button>

            ))}
          </div>
          <div className="mt-5">
            <span className="text-sm textColor1 italic">Quantity</span>
            <div className="mt-6">
              <button className="mr-3 rounded-full border border-[#0d87f8] px-4 py-2 text-base text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white duration-300 dark:hover:bg-transparent dark:hover:text-[#0d87f8] dark:hover:drop-shadow-[0px_0px_2px_#0d87f8] font-medium">
                <span onClick={handleAdd} className="text-lg">+</span>
                <span className="mx-7">{count}</span>
                <span onClick={handleReduce} className="text-lg">-</span>
              </button>
            </div>
          </div>
          <div className="my-10 mx-auto w-full">
            <button className="btn btn-wide  rounded-full bg-gradient-to-r  from-cyan-400 to-cyan-400 text-white  text-lg font-Roboto">Add to Cart</button>
          </div>
          <div className="my-5">
            <h3 className="text-2xl mb-3 textColor1">পাওয়ার ফ্যাক্টসঃ</h3>
            <Section1TextAnimation card={card.description}></Section1TextAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Details;





// <button className="rounded-full border border-[#0d87f8] px-4 py-2 text-sm text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white  duration-300 dark:hover:bg-transparent dark:hover:text-[#0d87f8] dark:hover:drop-shadow-[0px_0px_2px_#0d87f8]">SEND MESSAGE</button>


// <span className="absolute -bottom-6 left-1/2 z-30 flex h-[40px] w-[40px] -translate-x-1/2 transform items-center  justify-center rounded-full bg-white bg-gradient-to-tr from-[#0d87f8]  to-[#70c4ff] duration-500 group-hover:rotate-180 group-hover:shadow-[0px_0px_30px_2px_#0d87f8]"><svg width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="style=linear"><g id="add"><path id="vector" d="M11.998 5.84424L11.998 18.1604" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path><path id="vector_2" d="M18.1561 12.002L5.83998 12.0019" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path></g></g></g></svg></span>

{/* <span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/80 to-[#70c4ff]/80 duration-300 group-hover:h-[50px] group-hover:w-[50px]"></span>
<span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/50 to-[#70c4ff]/50 duration-500 hover:duration-300 group-hover:h-[60px] group-hover:w-[60px] "></span> */}