import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';
import { CircularProgress } from '@mui/material';
import { articleQueries } from '@/entities/article';
import { EventCard } from '../event-card/event-card.ui';

import 'swiper/css';
import 'swiper/css/pagination';


export const EventList = () => {
  const {
    data: eventsData,
    isLoading,
    isError,
  } = articleQueries.useGetEvents();

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
        modules={[Pagination]}
        pagination={{ clickable: true }}
       slidesPerView={1}
       spaceBetween={10}
        loop={true}
              className='category-swiper flex justify-center items-center '
      >
        {eventsData.data.map((slide) => (
          <SwiperSlide key={slide.id}>
            <EventCard c
              id={0}
              title={slide.title}
              photo={slide.photo}
              description={slide.description}
              location={slide.location}
              startDate={slide.startDate}
              endDate={slide.endDate}
              createdAt={slide.createdAt}
            />
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
};
