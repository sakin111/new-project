import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import Category from '../../../Pages/Category';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../../Hook/useAxiosPublic';

const Slider = () => {


  const axiosPublic = useAxiosPublic()


  const { data: SliderData, isLoading } = useQuery({
    queryKey: ["SliderData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/sliderData");
      return response.data;
    }
  })

  if (isLoading) {
    return <span className='loading-spinner'></span>
  }


  return (
    <div className="flex flex-col lg:flex-row justify-center items-start  gap-5 py-6">
      {/* Category Section */}
      <div className="w-full  lg:w-1/4">
        <Category></Category>
      </div>

      {/* Swiper Section */}
      <div className="w-full lg:w-[70%]"



      >
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
              <div className="hero  relative max-w-7xl h-[500px] mx-auto bg-no-repeat bg-fixed rounded-2xl flex items-center px-6 sm:px-10 md:px-16 sm:max-w-3xl md:max-w-7xl xs:max-w-3xl md:mx-auto"
                style={{
                  backgroundImage: `url(${slider.dataForm.imageUrl})`,
                }}
              >
                <div className="absolute inset-0 left-0 w-1/2 bg-gradient-to-r from-slate-800 via-transparent rounded-2xl"></div>

                <div className='flex justify-center items-center gap-5 translate-x-7 translate-y-32'>
                  <div className='h-52 w-3 bg-yellow-400'></div>

                  <div className="text-white text-left z-10 max-w-lg ">
                    <h1 className="mb-5 text-2xl sm:text-3xl md:text-3xl font-bold">
                      {slider.dataForm.title}
                    </h1>
                    <p className="mb-5 text-sm sm:text-sm md:text-sm">
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
