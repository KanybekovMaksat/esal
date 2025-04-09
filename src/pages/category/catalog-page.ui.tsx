import { useState } from 'react';
import { CircularProgress, Rating } from '@mui/material';
import { productQueries } from '~entities/product';
import { Title } from '~shared/ui/title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { LikeButton } from '@/features/article/like-button';
import { FavoriteButton } from '@/features/article/favorite-button';
import { ShareButton } from '@/features/article/share-button';

import { styled } from '@mui/material/styles';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000000',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


export function CategoryPage() {
  const {
    data: categoriesData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = productQueries.useGetCategories();

  const {
    data: placesData,
    isLoading: isPlacesLoading,
    isError: isPlacesError,
  } = productQueries.useGetPlace();

  const [activeCategories, setActiveCategories] = useState<number[]>([]);

  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate('/places/' + id);
  };

  const toggleCategory = (id: number) => {
    setActiveCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const filteredPlaces =
    activeCategories.length > 0
      ? placesData?.data.filter((place: any) =>
          activeCategories.includes(place.category.id)
        )
      : placesData?.data;

  if (isCategoryLoading || isPlacesLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress className="text-black w-10 h-10" />
        <h3 className="text-black font-semibold text-lg opacity-75">
          Загружаем категории...
        </h3>
      </div>
    );
  }

  if (isCategoryError || isPlacesError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-black font-semibold text-lg opacity-75">
          Не удалось загрузить категории!
        </h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4">
      <Title>Категории интересных мест</Title>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        spaceBetween={10}
        slidesPerView={'auto'}
        className="mb-6 mt-4 category-swiper"
      >
        {categoriesData?.data.map((category: any) => (
          <SwiperSlide key={category.id} className="w-[350px]">
            <div
              onClick={() => toggleCategory(category.id)}
              className={`w-full h-full flex items-start gap-2 hover:cursor-pointer justify-start p-4 rounded-2xl border ${
                activeCategories.includes(category.id)
                  ? 'bg-[#16a34a] border-[#16a34a] text-white'
                  : 'bg-white border-black/40 opacity-70'
              } text-gray-800 hover:shadow-lg transition duration-200`}
            >
              <img src={category.icon} alt={category.name} className="h-[40px] opacity-70" />
              <div>
                <h3 className="font-bold text-md ">
                  {category.name}
                </h3>
                <p className="text-[14px] leading-[120%] text-left  line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Title className="text-center">Места</Title>
      <div className="flex flex-wrap gap-[30px] justify-center">
        {filteredPlaces?.map((place: any) => (
          <div
            key={place.id}
   
            className="w-[350px] py-2 gap-2 hover:cursor-pointer justify-start p-[10px] rounded-md shadow-lg bg-white text-gray-800 hover:shadow-lg transition duration-200 mb-4"
          >
            <div          onClick={() => handleNavigate(place.id)}>
            <div className="relative w-full h-[200px] flex justify-center">
              <img
                src={place.photo}
                className="rounded-md h-[200px] object-cover w-full"
                alt={place.name}
              />
              <div className="absolute top-0 left-0 w-full flex items-center px-1 justify-between backdrop-blur-md bg-white/50 py-1 rounded-t-md">
                <div className="flex gap-1 items-center text-[14px]">
                  <Eye size={18} strokeWidth={2} className="text-[7px]" />
                  {place.viewCount}
                </div>
                <StyledRating
                  size="small"
                  name="half-rating-read"
                  defaultValue={place.rating}
                  precision={0.5}
                  readOnly
                  className="p-1 rounded-md"
                />
              </div>
            </div>
            <div className="h-[90px]">
              <h3 className="font-bold text-black/70 text-md leading-[120%] py-1">
                {place.name}
              </h3>
              <p className="text-[14px] leading-[120%] text-left opacity-70 line-clamp-2">
                {place.description}
              </p>
            </div>
            </div>
            <div className="py-1 flex items-center justify-between border-t border-gray-200">
              <div className="flex gap-2">
                <LikeButton
                  like={{
                    id: place.id,
                    likeCount: place.likeCount,
                    likes: place.likes,
                  }}
                />
                <FavoriteButton id={place.id} />
              </div>
              <ShareButton title={place.name} id={place.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
