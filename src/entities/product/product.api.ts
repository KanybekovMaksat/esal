import axios from 'axios';
import  $api  from '~shared/api';

const API = "https://esal.makalabox.com/api";


export function getPlaces() {
  return axios.get(`${API}/places/`);
}

export function getCategories(){
  return axios.get(`${API}/categories/`)
}

export function getAdsProducts(){
  return axios.get(`${API}/ad-slides/`)
}

export function getFavoriteProduct(id: number) {
  return $api.get(`favorites/${id}/`);
}

export function getFavorites(){
  return $api.get(`users/favorite/`);
}



export function createOrder(orderItems: { product: number; quantity: number }[]) {
  return $api.post(`orders/me/`, { orderItems });
}

export function getCartInfo(){
  return $api.get('orders/me')
}

export function createPayment(orderId:number){
  return $api.post(`create-payment/${orderId}/`)
}