import {
  CircularProgress,
  Container,
  Divider,
  Rating,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articleQueries } from '~entities/article';
import { withSuspense } from '~shared/lib/react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import { LikeButton } from '~features/article/like-button';
import { FavoriteButton } from '~features/article/favorite-button';
import { ShareButton } from '~features/article/share-button';
import { Button } from '@/app/components/ui/button';
import { Divide, Eye } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb';
import { CommentForm } from '@/widgets/comment-form';
import { CommentList } from '@/widgets/comment-list';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#000000',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function Page() {
  const { id } = useParams();
  const [preLoad, setPreLoad] = useState(true);

  useEffect(() => {
    setPreLoad(false);
  }, []);

  const {
    data: articleData,
    isLoading,
    isError,
  } = articleQueries.useGetArticleDetail(parseInt(id));

  // articleQueries.useUpdateArticleView(Number(id));

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        className="mx-auto my-[65px] px-2 md:px-5 mb-5 flex flex-col items-center"
      >
        <CircularProgress className="w-[50px] mt-20 mx-auto" />
        <p className="text-center mt-2">Загрузка статьи...</p>
      </Container>
    );
  }

  if (isError || !articleData) {
    return (
      <div className="my-20 text-center">Error fetching article data.</div>
    );
  }
  const {
    name,
    description,
    id: placeId,
    photo,
    category,
    rating,
    address,
    facebook,
    instagram,
    twitter,
    youtube,
    tiktok,
    viewCount,
    likeCount,
    likes
  } = articleData.data;

  return (
    <div>
      <Container maxWidth="md" className="mx-auto my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Главная </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/category">Категории</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-2">{name}</h1>
          <div className="relative w-full h-[300px] ">
            <img
              src={photo}
              alt={name}
              className="w-full h-[300px] object-cover rounded-lg "
            />
            <div className="absolute top-0 left-0 w-full flex items-center px-1 justify-between backdrop-blur-md bg-white/50 py-1 rounded-t-md">
              <div className="flex gap-1 items-center text-[14px]">
                <Eye className="w-4 text-gray-600" />
                {viewCount}
              </div>
              <StyledRating
                size="small"
                name="half-rating-read"
                defaultValue={rating}
                precision={0.5}
                readOnly
                className="p-1 rounded-md"
              />
            </div>
            <Button
              variant="outline"
              className="absolute bottom-2 left-2 bg-white rounded-md shadow-md hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="h-8 w-8 object-cover"
                />
                <span className="text-gray-600">{category.name}</span>
              </div>
            </Button>
          </div>
          <Divider className="mt-2" />
          <p className="text-sm text-justify text-gray-600 mt-2">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col"></div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Адрес</h2>
          <div className="mt-2 w-full overflow-hidden rounded-2xl">
            <div
              className="w-full h-[300px] google-map"
              dangerouslySetInnerHTML={{ __html: address }}
            ></div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Социальные сети
          </h2>
          <div className="flex space-x-4 mt-2">
            {facebook && (
              <Button asChild>
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/facebook.svg"
                    alt="Facebook"
                    className="h-6 w-6"
                  />
                </a>
              </Button>
            )}
            {instagram && (
              <Button asChild>
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    className="h-6 w-6"
                  />
                </a>
              </Button>
            )}
            {twitter && (
              <Button asChild>
                <a href={twitter} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    className="h-6 w-6"
                  />
                </a>
              </Button>
            )}
            {youtube && (
              <Button asChild>
                <a href={youtube} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/youtube.svg"
                    alt="YouTube"
                    className="h-6 w-6"
                  />
                </a>
              </Button>
            )}
            {tiktok && (
              <Button asChild>
                <a href={tiktok} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/tiktok.svg"
                    alt="TikTok"
                    className="h-6 w-6"
                  />
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LikeButton
              like={{
                id: id,
                likeCount: likeCount,
                likes: likes,
              }}
            />
            <FavoriteButton id={id} />

          </div>
            <ShareButton />
        </div>
        <div className="max-w-full md:max-w-[95%] bg-[white]  py-5 ">
          <h3 className="font-bold text-2xl">Комментарии</h3>
          <CommentForm id={parseInt(placeId)} />
          <CommentList id={parseInt(placeId)} />
        </div>
      </Container>
    </div>
  );
}

function Loader() {
  return <div className="my-20">loading...</div>;
}
const SuspensedPage = withSuspense(Page, {
  fallback: <Loader />,
});

export const ArticlePage = withErrorBoundary(SuspensedPage, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
