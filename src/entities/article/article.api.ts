import $api from '~shared/api';
import {
  ArticlesList,
  Article,
  CreateArticleDto,
  CreateBox,
  AddArticleBoxDtoSchema,
} from './article.types';
import axios from 'axios';

const API_URL = 'https://esal.makalabox.com/api/';

export function getArticleQuery() {
  return axios.get<ArticlesList>(`${API_URL}articles/`);
}

export function getArticleDetailsQuery(id: number) {
  return axios.get<Article>(`${API_URL}places/${id}/`);
}

export function updateViewQuery(id: number) {
  return axios.get(`${API_URL}update-view/${id}`);
}

export function getFavoriteArticles() {
  return $api.get('users/favorite/');
}

export function likeArticleQuery(id: number) {
  return $api.get(`like/${id}`);
}

export function getEvents(){
  return axios.get(`${API_URL}events/`)
}



export function editArticle(props: any = {}) {
  const { data } = props;

  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else {
      formData.append(key, data[key]);
    }
  }

  return $api.patch(`articles/me/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function favoriteArticleQuery(id: number) {
  return $api.get(`users/favorite/${id}/`);
}




