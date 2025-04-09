import { CircularProgress, Rating } from '@mui/material';
import { productQueries } from '~entities/product';
import { Title } from '~shared/ui/title';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { Button } from '@/app/components/ui/button';
import { styled } from '@mui/material/styles';
import { Eye } from 'lucide-react';
import { LikeButton } from '@/features/article/like-button';
import { FavoriteButton } from '@/features/article/favorite-button';
import { ShareButton } from '@/features/article/share-button';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000000',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export function FavoritePage() {
  const isAuth = getCookie('access');
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate('/places/' + id);
  };

  const {
    data: productData,
    isLoading,
    isError,
  } = productQueries.useGetFavoriteProducts();

  if (!isAuth) {
    return (
      <div className="text-center text-gray-600">
        <p className="mb-4">Необходима авторизация.</p>
        <Button asChild>
          <Link to="/login">Авторизация</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress className="text-black w-10 h-10" />
        <h3 className="text-black font-semibold text-lg opacity-75">
          Загружаем данные...
        </h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-black font-semibold text-lg opacity-75">
          Произошла ошибка при загрузке данных!
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Title className="text-center">Сохранённые</Title>
        {productData.data.favoritePlaces.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {productData.data.favoritePlaces.map((place: any) => (
              <div
                key={place.id}
               
                className="w-[350px] py-2 gap-2 hover:cursor-pointer justify-start p-[10px] rounded-md shadow-lg bg-white text-gray-800 hover:shadow-lg transition duration-200 mb-4"
              >
                <div  onClick={() => handleNavigate(place.id)}>
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
        ) : (
          <div className="text-center text-gray-600">
            <p className="mb-4">У вас нет товаров в избранном.</p>
            <Button asChild>
            <Link
              to="/"
            >
              Вернуться на главную
            </Link>

            </Button>
          </div>
        )}
      </div>
    </div>
  );
}