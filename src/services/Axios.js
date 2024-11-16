import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để đính kèm token vào headers của mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken');
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJidXMtdGlja2V0LmNvbSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzMxODE5Njg2LCJpYXQiOjE3MzE3MzMyODYsImp0aSI6ImExMzdhYmJkLTdjNzUtNDdlZC1hMjI0LTA1ODgzYjQ4ZTAxYiIsInNjb3BlIjoiQURNSU4ifQ.dOPsGBL17XFLl_b_7RoPlIeO7vHFny1TjJFrdORW4BdK9kvY4GbnqbXrWIl3f1QKKoUrBQfq3-YMczhEwyw9lw';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
