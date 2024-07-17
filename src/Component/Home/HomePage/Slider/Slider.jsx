// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css';

import { EffectFade, Pagination, Autoplay } from 'swiper/modules';



export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect="fade"
        pagination={{
          clickable: true,
        }}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="card w-[95%] mt-3">
            <figure>
              <img
                src="https://i.ibb.co/KWsSkFj/Gemini-Generated-Image-7x1sjp7x1sjp7x1s-1.jpg"
                alt="Healthy Food Products"
                className="rounded-xl"
              />
            </figure>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-[95%] mt-3">
            <figure>
              <img
                src="https://i.ibb.co/ckYfgZB/rsz-1gemini-generated-image-rj1h9trj1h9trj1h.jpg"
                alt="Healthy Food Products"
                className="rounded-xl"
              />
            </figure>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-[95%] mt-3">
            <figure>
              <img
                src="https://i.ibb.co/HP5bV1b/Gemini-Generated-Image-8k588x8k588x8k58-1.jpg"
                alt="Healthy Food Products"
                className="rounded-xl"
              />
            </figure>
          </div>
        </SwiperSlide>
       
      </Swiper>
    </>
  );
}
