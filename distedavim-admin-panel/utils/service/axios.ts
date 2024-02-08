// src/interceptors/responseInterceptor.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL,
    headers : {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`,
    }
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
