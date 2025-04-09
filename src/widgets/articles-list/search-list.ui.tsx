import {
    Avatar,
    Card,
    CardContent,
    CardMedia,
    Tooltip,
    CircularProgress,
    CardActionArea,
    Container,
    Rating,
  } from '@mui/material';
  import dayjs from 'dayjs';
  import 'dayjs/locale/ru';
  import { Link, useNavigate } from 'react-router-dom';
  import { pathKeys } from '~shared/lib/react-router';
  import { articleQueries, articleTypes } from '~entities/article';
  import { ShareButton } from '~features/article/share-button';
  import { LikeButton } from '~features/article/like-button';
  import { FavoriteButton } from '~features/article/favorite-button';
  
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
  import NavigateNextIcon from '@mui/icons-material/NavigateNext';
  
  dayjs.locale('ru');
  const placesInBishkek = [
    {
      id: 1,
      title: "Ала-Тоо Площадь",
      subtitle: "Главная площадь города, место проведения мероприятий.",
      photo: "https://too.kg/wp-content/uploads/15762598709211023_e489.jpg",
      created: "2025-03-12",
      viewCount: 2500,
      readTime: 2,
      likeCount: 650,
      likes: [],
    },
    {
      id: 2,
      title: "Ошский рынок",
      subtitle: "Самый крупный и колоритный базар города.",
      photo: "https://media-cdn.tripadvisor.com/media/photo-s/14/4b/87/f2/img-20180824-175736-814.jpg",
      created: "2025-03-10",
      viewCount: 1800,
      readTime: 3,
      likeCount: 400,
      likes: [],
    },
    {
      id: 3,
      title: "Парк Панфилова",
      subtitle: "Зеленая зона для отдыха и прогулок в центре города.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReYvazZswYXI1-qMRstTY_QbXc0w8I9-Dx9w&s",
      created: "2025-03-08",
      viewCount: 1200,
      readTime: 2,
      likeCount: 520,
      likes: [],
    },
    {
      id: 4,
      title: "Государственный музей И. Раззакова",
      subtitle: "Исторический музей с экспозициями о Кыргызстане.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-P0-P3FT1W-nxApfMCrjMsxjFlm32ufHRA&s",
      created: "2025-03-07",
      viewCount: 800,
      readTime: 4,
      likeCount: 300,
      likes: [],
    },
    {
      id: 5,
      title: "Горнолыжная база Чункурчак",
      subtitle: "Популярное место для зимнего отдыха и катания на лыжах.",
      photo: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/605307540.jpg?k=2029a28553965867cea58d247b8587b70cec4c1bb391be625732f6f3d2e459a4&o=&hp=1",
      created: "2025-03-05",
      viewCount: 2200,
      readTime: 3,
      likeCount: 800,
      likes: [],
    },
    {
      id: 6,
      title: "Парк имени Ататюрка",
      subtitle: "Спокойное место для прогулок и занятий спортом.",
      photo: "https://cdn-1.aki.kg/127/.storage/limon/images/870a6530778e20b3789c666e2c3944e8.jpg",
      created: "2025-03-03",
      viewCount: 950,
      readTime: 2,
      likeCount: 290,
      likes: [],
    },
    {
      id: 7,
      title: "Национальная библиотека",
      subtitle: "Крупнейшая библиотека Кыргызстана с уникальными книгами.",
      photo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Nationallibrary.jpg",
      created: "2025-03-01",
      viewCount: 600,
      readTime: 3,
      likeCount: 180,
      likes: [],
    },
    {
      id: 8,
      title: "ЦУМ (Центральный Универсальный Магазин)",
      subtitle: "Популярный торговый центр в Бишкеке.",
      photo: "https://images.news.ru/photo/cba4f3da-f907-11eb-8d32-96000091f725_1024.jpg",
      created: "2025-02-28",
      viewCount: 1400,
      readTime: 2,
      likeCount: 470,
      likes: [],
    },
    {
      id: 9,
      title: "Ботанический сад",
      subtitle: "Прекрасное место для прогулок и изучения растений.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjDEgL-cL2gMf2s6iMn03UonskUmiwalV8Q&s",
      created: "2025-02-25",
      viewCount: 750,
      readTime: 3,
      likeCount: 210,
      likes: [],
    },
    {
      id: 10,
      title: "Винодельня Шато Юрта",
      subtitle: "Лучшее место для дегустации местных вин.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCJ-CmMv5pDdBIGXZWSAIAfXvkQs6bco_mYw&s",
      created: "2025-02-20",
      viewCount: 900,
      readTime: 3,
      likeCount: 320,
      likes: [],
    },
    {
      id: 11,
      title: "Ресторан Supara",
      subtitle: "Популярный ресторан национальной кухни.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1K-DFDo9cjGVGsySNLYz_ghO5KMe_9PsKmA&s",
      created: "2025-02-15",
      viewCount: 1800,
      readTime: 2,
      likeCount: 700,
      likes: [],
    },
    {
      id: 12,
      title: "Горячие источники Иссык-Ата",
      subtitle: "Лечебные термальные воды недалеко от города.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqDAaWJIf0GGcZHDLTeRBAI3i1i-ncL5qRDw&s",
      created: "2025-02-10",
      viewCount: 1100,
      readTime: 3,
      likeCount: 450,
      likes: [],
    },
  ];
  
  type ArticlesListProps = {
    searchTerm: string;
    filter: string;
  };
  
  export function SearchList({ searchTerm, filter }: ArticlesListProps) {
    const {
      data: articleData,
      isLoading,
      isSuccess,
      isError,
    } = articleQueries.useGetArticles();
  
    if (isLoading) {
      return (
        <div>
          <CircularProgress className="w-[50px] mx-auto flex justify-center" />
          <p className="text-center mt-2">Загрузка статей...</p>
        </div>
      );
    }
  
    if (isError) {
      return <div className="my-20">Error fetching user data.</div>;
    }
  
    const articles = articleData?.data?.results;
  
    if (articles.length == 0) {
      return (
        <div className="text-center font-medium">
          К сожалению, у вас нет избранных статей📖
        </div>
      );
    }
  
    const filteredArticles = placesInBishkek.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter ? article.title === filter : true)
    );
  
    return (
      <div className="flex flex-wrap justify-between gap-5 ">
        {isSuccess &&
          filteredArticles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        <Link
          className="flex justify-end underline text-pc-500 my-3"
          to={pathKeys.feed()}
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
      navigate(pathKeys.article.byId({ id }));
    };
  
    return (
      <Card className="min-w-full max-w-full md:min-w-[350px] md:max-w-[350px] shadow-none rounded-lg border border-sc-100">
        <div className="flex flex-col">
          <CardContent className="p-4">
            <div
              className="cursor-pointer"
              onClick={() => handleNavigate(props.article.id)}
            >
              <Link
                to={`article/${String(props.article.id)}`}
                className="text-md font-bold block leading-5"
              >
                {props.article.title}
              </Link>
            </div>
          </CardContent>
  
          <CardActionArea onClick={() => handleNavigate(props.article.id)}>
            <CardMedia
              component="img"
              className="w-full h-[200px] object-cover rounded-b-lg"
              image={props.article.photo}
              alt={props.article.title}
            />
          </CardActionArea>
  
          <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500">
              <p className="flex items-center gap-1">
                <VisibilityIcon className="w-4" />
                {props.article.viewCount}
              </p>
            <div className="flex items-center gap-3">
              <Tooltip title="Рейтинг">
                <p className="flex items-center gap-1">
                <Rating name="read-only" value={props.article.readTime} readOnly />
                </p>
              </Tooltip>
            </div>
          </div>
  
          <div className="px-4 py-2 flex items-center justify-between border-t border-gray-200">
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
            <ShareButton title={props.article.title} id={props.article.id} />
          </div>
        </div>
      </Card>
    );
  }