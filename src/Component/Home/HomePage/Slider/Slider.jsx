import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
// import Category from '../../../Pages/Category';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../../Hook/useAxiosPublic';

const Slider = () => {
  const axiosPublic = useAxiosPublic();

  const { data: SliderData, isLoading } = useQuery({
    queryKey: ["SliderData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/SliderData");
      return response.data;
    }
  });

  if (isLoading) return <div className="h-screen bg-white w-full p-9 ">
  <div className="max-w-7xl mx-auto w-full" >
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
  </div>


</div>

  return (
    <div>
    

      {/* Swiper Section */}
      <div className="w-full lg:w-[95%] mx-auto py-6">
        <Swiper
          spaceBetween={30}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[EffectFade, Pagination, Autoplay]}
          className="w-full"
        >
          {SliderData.map((slider, index) => (
            <SwiperSlide key={index}>
              <div
                className="hero relative max-w-7xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[630px] mx-auto 
                           bg-no-repeat bg-cover bg-center rounded-2xl flex items-center px-6 sm:px-10 md:px-16"
                style={{
                  backgroundImage: `url(${slider.dataForm.imageUrl})`,
                }}
              >
                <div className="absolute inset-0 left-0 w-1/2 bg-gradient-to-r from-slate-800 via-transparent rounded-2xl"></div>

                <div className="flex justify-center items-center gap-5 translate-x-5 translate-y-20 sm:translate-y-24 md:translate-y-28">
                  <div className="h-40 sm:h-44 md:h-48 w-2 bg-yellow-400"></div>

                  <div className="text-white text-left z-10 max-w-lg">
                    <h1 className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                      {slider.dataForm.title}
                    </h1>
                    <p className="mb-3 text-xs sm:text-sm md:text-base">
                      {slider.dataForm.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
