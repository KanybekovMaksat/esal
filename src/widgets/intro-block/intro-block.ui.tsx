import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ICard {
  image: string;
  title: string;
  description: string;
}

const cards: ICard[] = [
  {
    image: 'https://i.pinimg.com/736x/87/13/50/8713506c604cc26afc4173a7e4b398d9.jpg',
    title: 'Площадь Ала-Тоо',
    description: 'Главная площадь города, сердце общественных мероприятий и праздников.',
  },
  {
    image: 'https://i.pinimg.com/736x/f8/0e/f9/f80ef94bf3f376073e49e47ec8513bbe.jpg',
    title: 'Национальный музей',
    description: 'Один из самых больших музей, где можно ознакомить с культурой и историей КР',
  },
  {
    image: 'https://i.pinimg.com/736x/9b/0a/84/9b0a84bb0ffd27647a3eadae5ffe59d6.jpg',
    title: 'Парк Победы',
    description: 'Живописное место для прогулок, с монументом в честь победы во Второй мировой войне.',
  },
  {
    image: 'https://i.pinimg.com/736x/47/37/e3/4737e3d658508bed9a1c1ad5b27f11b1.jpg',
    title: 'Ала-Арча',
    description: 'Природный заповедник с потрясающими горами и чистым воздухом.',
  },
  {
    image: 'https://i.pinimg.com/736x/79/9d/f3/799df3d826c348cf29f00db0ce34868e.jpg',
    title: 'Дубовый парк',
    description: 'Зеленый уголок в центре города с музеями и арт-объектами.',
  },
];

function CardItem({ image, title, description }) {
  return (
    <div className="min-h-[250px] max-h-[250px] min-w-[350px] max-w-[350px] p-3 py-4 hover:text-second-100 bg-[white] border-2 border-[#ccccccbc] duration-300 hover:border-pc-200 rounded-md">
      <img src={image} alt={title} className="rounded max-h-[140px] min-w-full object-cover object-center mx-auto" />
      <h3 className="text-sm md:text-lg font-semibold my-1 text-center">{title}</h3>
      <p className="text-xs  md:font-medium text-center md:text-left">
        {description}
      </p>
    </div>
  );
}

export function IntroBlock() {
  return (
    <div className="">
      <div className="flex slider-banner">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          breakpoints={{
            420: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className='category-swiper'
          pagination={{ clickable: true }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <CardItem {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
