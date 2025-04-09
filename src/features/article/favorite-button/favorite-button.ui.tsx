import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { getCookie } from 'typescript-cookie';
import { articleQueries } from '~entities/article';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { productQueries } from '@/entities/product';

type FavoriteButtonProps = { id: number };

export function FavoriteButton(props: FavoriteButtonProps) {
  const isAuth = getCookie('access');
  const navigate = useNavigate();

  const {
    data: favData,
    isLoading,
    isError,
  } = productQueries.useGetFavoriteProducts();

  const redirectToRegisterPage = () => {
    navigate(pathKeys.register());
  };

  const { mutate: saveFavorite, isPending } = articleQueries.useFavoriteArticle(props.id);
  

  const favoriteArticles = favData?.data?.favoritePlaces;

  const handleSaveFavorite = useCallback(async () => {
    await saveFavorite();
  }, [saveFavorite]);

  if (!favData || !favData.data || !isAuth) {
    return (
      <Tooltip title={'Нужна авторизация'}>
        <span>
          <IconButton onClick={redirectToRegisterPage} aria-label="Сохранить">
            <BookmarkAddIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  const isFavoritedPosts = favoriteArticles?.some(
    (post) => post.id === props.id
  );
  if(isPending){
    return <div className='p-1'>
      <CircularProgress size={25} className='text-[#16a34a]'/>
    </div>
  }

  return (
    <Tooltip
      title={
        isFavoritedPosts ? 'Удалить из сохраненных' : 'Сохранить'
      }
    >
      <IconButton onClick={handleSaveFavorite} aria-label="Сохранить">
        {isFavoritedPosts ? (
          <BookmarkAddedIcon className="text-[#16a34a]" />
        ) : (
          <BookmarkAddIcon className="hover:text-[#16a34a]" />
        )}  
      </IconButton>
    </Tooltip>
  );
}
