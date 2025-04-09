import {
  createOrder,
  createPayment,
  getAdsProducts,
  getCartInfo,
  getCategories,
  getFavoriteProduct,
  getFavorites,
  getPlaces,
} from './product.api';
import {
  useQuery,
  queryOptions as tsqQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const keys = {
  root: () => ['article'],
  category: () => ['category'],
  cart: () => ['cart'],
  createOrder: () => [...keys.root(), 'create'] as const,
  getCart: () => [...keys.root(), 'cart-info'] as const,
  getPlace: () => [...keys.root(), 'place'] as const,
  getAdProducts: () => [...keys.root(), 'ad-products'] as const,
  getFavoriteProducts: () => [...keys.root(), 'fav'] as const,
  getCategories: () => [...keys.category(), 'categories'] as const,
  favProduct: (id: number) => [...keys.root(), 'favorite', id] as const,
};

export function useGetPlace() {
  return useQuery({
    queryKey: keys.getPlace(),
    queryFn: getPlaces,
  });
}

export function useGetAdProducts() {
  return useQuery({
    queryKey: keys.getAdProducts(),
    queryFn: getAdsProducts,
  });
}

export function useFavoriteProduct(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.favProduct(id),
    mutationFn: () => getFavoriteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.favProduct(id) });
      await queryClient.invalidateQueries({ queryKey: keys.root() });
    },
  });
}

export function useGetFavoriteProducts() {
  return useQuery({
    queryKey: keys.getFavoriteProducts(),
    queryFn: getFavorites,
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: keys.getCategories(),
    queryFn: getCategories,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.createOrder(),
    mutationFn: createOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.cart() });
    },
  });
}

export function useGetCart() {
  return useQuery({
    queryKey: keys.getCart(),
    queryFn: getCartInfo,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.createOrder(),
    mutationFn: createPayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.cart() });
    },
  });
}
