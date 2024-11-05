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
      'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJidXMtdGlja2V0LmNvbSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzMwODA1MDcyLCJpYXQiOjE3MzA3MTg2NzIsImp0aSI6ImVjY2U4MDUzLTMyNjEtNGE1ZC1iYmQ2LTQ0NzVmMTk2Y2Y5YiIsInNjb3BlIjoiQURNSU4ifQ.viFap4VNdOXiW097U828UkWojZvcd1UMjXGQXYdUn7iRzj5nH4UBs8UEPH7SaTvgUW-Gi2pbtRTvodqywNOuYQ';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
