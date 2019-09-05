import http from '@/utils/request';

export const login = (params) => {
  return http.post('/login/cellphone', params);
};
