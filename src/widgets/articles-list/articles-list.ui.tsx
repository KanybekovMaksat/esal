import { CircularProgress, Rating, styled } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Link, useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { articleTypes } from '~entities/article';
import { ShareButton } from '~features/article/share-button';
import { LikeButton } from '~features/article/like-button';
import { FavoriteButton } from '~features/article/favorite-button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { productQueries } from '@/entities/product';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000000',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

dayjs.locale('ru');

export function ArticlesList() {
  const {
    data: placesData,
    isLoading: isPlacesLoading,
    isError: isPlacesError,
  } = productQueries.useGetPlace();

  if (isPlacesLoading) {
    return (
      <div>
        <CircularProgress className="w-[50px] mx-auto flex justify-center" />
        <p className="text-center mt-2">Загрузка статей...</p>
      </div>
    );
  }

  if (isPlacesError) {
    return <div className="my-20">Error fetching user data.</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 ">
    {placesData?.data.map((article) => (
      <ArticleCard article={article} key={article.id} />
    ))}
      <Link
        className="flex justify-end underline text-pc-500 my-3"
        to="/category"
      >
        Смотреть больше
        <NavigateNextIcon />
      </Link>
    </div>
  );
}

type ArticleCardProps = { article: articleTypes.Article };

function ArticleCard(props: ArticleCardProps) {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate('/places/' + id);
  };

  return (
    <div
      key={props.article.id}
      className="w-[350px] py-2 gap-2 hover:cursor-pointer justify-start p-[10px] rounded-md shadow-lg bg-white text-gray-800 hover:shadow-lg transition duration-200 "
    >
      <div onClick={() => handleNavigate(props.article.id)}>
        <div className="relative w-full h-[200px] flex justify-center">
          <img
            src={props.article.photo}
            className="rounded-md h-[200px] object-cover w-full"
            alt={props.article.name}
          />
          <div className="absolute top-0 left-0 w-full flex items-center px-1 justify-between backdrop-blur-md bg-white/50 py-1 rounded-t-md">
            <div className="flex gap-1 items-center text-[14px]">
              <VisibilityIcon className="w-4 text-gray-600" />
              {props.article.viewCount}
            </div>
            <div className='flex items-center'>
           <p className='font-bold text-xs'> {props.article.rating}</p>
            <StyledRating
              size="small"
              name="half-rating-read"
              defaultValue={props.article.rating}
              precision={0.5}
              readOnly
              className="p-1 rounded-md"
            />
            </div>
          </div>
        </div>
        <div className="h-[90px]">
          <h3 className="font-bold text-black/70 text-md leading-[120%] py-1">
            {props.article.name}
          </h3>
          <p className="text-[14px] leading-[120%] text-left opacity-70 line-clamp-2">
            {props.article.description}
          </p>
        </div>
      </div>
      <div className="py-1 flex items-center justify-between border-t border-gray-200">
        <div className="flex gap-2">
          <LikeButton
            like={{
              id: props.article.id,
              likeCount: props.article.likeCount,
              likes: props.article.likes,
            }}
          />
          <FavoriteButton id={props.article.id} />
        </div>
        <ShareButton title={props.article.name} id={props.article.id} />
      </div>
    </div>
  );
}

// function ArticleCard(props: ArticleCardProps) {
//   return (
//     <Card className="min-w-full max-w-full  shadow-none border border-sc-100 p-2 card">
//       <div className="flex flex-col-reverse md:flex-row items-center md:justify-between">
//         <CardContent className="md:p-[12px] p-2">
//           <div className="flex justify-between items-center pb-3">
//             <div className="flex flex-col md:flex-row md:items-center gap-3">
//               <div className="flex items-center gap-4 cursor-pointer">
//                 <div className="flex items-center">
//                   <Avatar
//                     className="duration-500 card-avatar border-2 border-[white]"
//                     alt={props.article.author}
//                     src={props.article.authorPhoto}
//                   />
//                   <h5 className="flex text-sm md:text-base  font-bold duration-300">
//                     {props.article.author}
//                   </h5>
//                 </div>
//                 <Tooltip title="Время чтения">
//                   <p className="text-md text-pc-400 flex items-center md:hidden gap-1 text-sm">
//                     <AccessTimeFilledIcon className="w-4" />
//                     {props.article.readTime} мин
//                   </p>
//                 </Tooltip>
//               </div>
//               <div className="flex items-center gap-3">
//                 <p className="text-md text-pc-400 text-sm ">
//                   {dayjs(props.article.created)
//                     .format('MMMM D, YYYY')
//                     .toUpperCase()}
//                 </p>
//                 <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
//                   <VisibilityIcon className="w-5" />
//                   {props.article.viewCount}
//                 </p>
//                 <Tooltip title="Время чтения">
//                   <p className="text-md text-pc-400 hidden md:flex items-center gap-1 text-sm">
//                     <AccessTimeFilledIcon className="w-4" />
//                     {props.article.readTime} мин
//                   </p>
//                 </Tooltip>
//               </div>
//             </div>
//           </div>
//           <div>
//             <Link
//               className="card-info"
//               to={pathKeys.article.byId({ id: props.article.id })}
//             >
//               <h4 className="font-bold text-xl title duration-300">
//                 {props.article.title}
//               </h4>
//               <p className="text-md text-pc-500 min-h-[70px]">
//                 {props.article.subtitle}...
//               </p>
//             </Link>
//             <div className="pt-2 flex items-center gap-1">
//               <LikeButton
//                 like={{
//                   id: props.article.id,
//                   likeCount: props.article.likeCount,
//                   likes: props.article.likes,
//                 }}
//               />
//               <FavoriteButton id={props.article.id} />
//               <ShareButton id={props.article.id} />
//             </div>
//           </div>
//         </CardContent>
//         <CardMedia
//           component="img"
//           className="w-[95%] md:max-w-[250px] min-h-[230px] max-h-[230px] rounded md:mr-[12px] cursor-pointer"
//           image={props.article.photo}
//           alt={props.article.title}
//           title={props.article.title}
//         />
//       </div>
//     </Card>
//   );
// }
