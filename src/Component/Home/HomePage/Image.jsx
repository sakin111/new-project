// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade, Pagination } from "swiper/modules";
// import PropTypes from "prop-types";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";

// const ImageSlider = ({ card }) => {
//   // Debugging logs
//   console.log("Card Data:", card);
//   const { images } = card || {}; // Ensure `card` is defined

//   if (!images || images.length === 0) {
//     console.log("No images found");
//     return <p className="text-center text-gray-500">No images available</p>;
//   }
//   console.log("Images:", images); // Debugging log

//   return (
//     <div className="flex flex-col lg:flex-row justify-center items-start gap-5 py-6">
//       <div className="w-full lg:w-[50%]">
//         <Swiper
//           spaceBetween={30}
//           effect="fade"
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 2500, disableOnInteraction: false }}
//           modules={[EffectFade, Pagination, Autoplay]}
//           className="w-full"
//         >
//           {images.map((image, index) => {
//             // Ensure correct image format
//             const imageUrl = typeof image === "string" ? image : image.url;
//             console.log(`Image ${index}:`, imageUrl); // Debugging log

//             return (
//               <SwiperSlide key={index}>
//                 <div
//                   className="hero relative max-w-7xl h-[500px] mx-auto bg-no-repeat bg-cover bg-center rounded-2xl flex items-center px-6"
//                   style={{ backgroundImage: `url(${imageUrl})` }}
//                 >
//                   <div className="absolute inset-0 left-0 w-1/2 bg-gradient-to-r from-slate-800 via-transparent rounded-2xl"></div>
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// ImageSlider.propTypes = {
//   card: PropTypes.shape({
//     images: PropTypes.arrayOf(PropTypes.string).isRequired,
//   }).isRequired,
// };

// export default ImageSlider;