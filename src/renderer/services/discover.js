import http from '@/utils/request';

export const getRecommendResource = (params) => {
  return http.get('/recommend/resource', params);
};

export const getPersonalized = (params) => {
  return http.get('/personalized', params);
};
