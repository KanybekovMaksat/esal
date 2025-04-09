import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';
import {
  editArticle,
  favoriteArticleQuery,
  getArticleDetailsQuery,
  getArticleQuery,
  getFavoriteArticles,
  likeArticleQuery,
  updateViewQuery,
} from './article.api';
import { toast } from 'react-toastify';
import { queryClient } from './../../shared/lib/react-query/react-query.lib';
import { Article } from './article.types';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

type AxiosErrorType = {
  code: string;
  config: any;
  message: string;
  name: string;
  request: any;
  response?: {
    data: any;
    status: number;
    headers: any;
    config: any;
  };
};

const keys = {
  root: () => ['article'],
  box: () => ['box'] as const,
  boxMe: () => ['boxme'] as const,
  boxDetail: (id: number) => [...keys.box(), 'byId', id] as const,
  getFavArticle: () => [...keys.root(), 'fav'] as const,
  getWriterArticle: () => [...keys.root(), 'writer'] as const,
  createArticle: () => [...keys.root(), 'create'] as const,
  updateArticle: () => [...keys.root(), 'update'] as const,
  article: (id: number) => [...keys.root(), 'byId', id] as const,
  deleteArticle: (id: number) => [...keys.root(), 'delete', id] as const,
  viewArticle: (id: number) => [...keys.root(), 'view', id] as const,
  favArticle: (id: number) => [...keys.root(), 'favorite', id] as const,
  likeArticle: (id: number) => [...keys.root(), 'like', id] as const,
};

export const articleService = {
  queryKey: (id: number) => keys.article(id),

  getCache: (id: number) =>
    queryClient.getQueryData(articleService.queryKey(id)),

  setCache: (article: AxiosResponse<Article>) =>
    queryClient.setQueryData(
      articleService.queryKey(article.data.id),
      article.data
    ),

  queryOptions: (id: number) => {
    const articleKey = articleService.queryKey(id);
    return tsqQueryOptions({
      queryKey: articleKey,
      queryFn: async () => {
        const article = await getArticleDetailsQuery(id);
        articleService.setCache(article);
        return article;
      },
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(articleKey)?.dataUpdatedAt,
    });
  },

  prefetchQuery: async (id: number) =>
    queryClient.prefetchQuery(articleService.queryOptions(id)),

  ensureQueryData: async (id: number) =>
    queryClient.ensureQueryData(articleService.queryOptions(id)),
};

export function useGetArticles() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getArticleQuery,
  });
}

export function useGetFavoriteArticles() {
  return useQuery({
    queryKey: keys.getFavArticle(),
    queryFn: getFavoriteArticles,
  });
}

export function useGetArticleDetail(id: number) {
  return useQuery({
    queryKey: keys.article(id),
    queryFn: () => getArticleDetailsQuery(id),
  });
}

export function useUpdateArticleView(id: number) {
  return useQuery({
    queryKey: keys.viewArticle(id),
    queryFn: () => updateViewQuery(id),
  });
}




export function useLikeArticle(id: number) {
  const queryClient = useQueryClient();
  const key = keys.article(id);

  return useMutation({
    mutationKey: keys.likeArticle(id),
    mutationFn: () => likeArticleQuery(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: keys.root() });
      await queryClient.cancelQueries({ queryKey: key });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.root() });
      await queryClient.invalidateQueries({ queryKey: key });
    },
  });
}

export function useFavoriteArticle(id: number) {
  const queryClient = useQueryClient();
  const key = keys.article(id);
  return useMutation({
    mutationKey: keys.favArticle(id),
    mutationFn: () => favoriteArticleQuery(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: keys.root() });
      await queryClient.cancelQueries({ queryKey: key });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.root() });
      await queryClient.invalidateQueries({ queryKey: key });
    },
  });
}




export function useUpdateArticle(id) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: keys.updateArticle(),
    mutationFn: editArticle,
    onSuccess: async () => {
      toast.success('Статья успешна отправлена на модерацию');
      // localStorage.removeItem(`editContent-${id}`);
      navigate('/profile');
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}
