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
      'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJidXMtdGlja2V0LmNvbSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzMxMDgxODk2LCJpYXQiOjE3MzA5OTU0OTYsImp0aSI6ImJiZmNlOWU0LTg0NzUtNGUxNy05ZmM4LWRjM2ZmNjE0ZmUyZiIsInNjb3BlIjoiQURNSU4ifQ._f9bODa6bIsnaPQS1X8k4UZZlwnjbA12La0mL8qkjUUYYARdhum6i0lKLZ_DL3n9U22liqWmbInEzrVtgJWXeQ';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
