import React from 'react';
import { productQueries } from '~entities/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { CircularProgress } from '@mui/material';

export const AdProducts = () => {
  const {
    data: AdProductsData,
    isLoading,
    isError,
  } = productQueries.useGetAdProducts();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress className="text-milk w-10 h-10" />
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Загружаем данные...
        </h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Произошла ошибка при загрузке данных!
        </h3>
      </div>
    );
  }

  
  return (
    <div className="slider-banner w-full md:max-w-7xl px-4">
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-[20rem] md:h-[16rem] sm:h-[12rem]"
      >
        {AdProductsData.data.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.photo}
                alt={slide.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-2xl md:text-xl sm:text-lg font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-base md:text-sm sm:text-xs">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
