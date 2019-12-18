import http from '@/utils/request';

export const getRecommendResource = (params) => {
  return http.get('/recommend/resource', params);
};

export const getPersonalized = (params) => {
  return http.get('/personalized', params);
};

export const getPlaylist = (params) => {
  return http.get('/top/playlist/highquality', params);
};

export const getCatlist = () => {
  return http.get('/playlist/catlist');
};

export const getHotCatlist = () => {
  return http.get('/playlist/hot');
};
