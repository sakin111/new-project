import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';


export default function App() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-2 px-4 py-6">
      {/* Category Section */}
      <div className="w-full px-4 lg:w-[25%]">
   
      </div>

      {/* Swiper Section */}
      <div className="w-full lg:w-[70%]">
        <Swiper
          spaceBetween={30}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[EffectFade, Pagination, Autoplay]}
          className="w-full"
        >
          {[
            "https://i.ibb.co/KWsSkFj/Gemini-Generated-Image-7x1sjp7x1sjp7x1s-1.jpg",
            "https://i.ibb.co/ckYfgZB/rsz-1gemini-generated-image-rj1h9trj1h9trj1h.jpg",
            "https://i.ibb.co/HP5bV1b/Gemini-Generated-Image-8k588x8k588x8k58-1.jpg",
          ].map((image, index) => (
            <SwiperSlide key={index}>
              <div className="card w-full">
                <figure className="rounded-md overflow-hidden shadow-md">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
