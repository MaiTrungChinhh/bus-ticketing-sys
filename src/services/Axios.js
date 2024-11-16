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

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJidXMtdGlja2V0LmNvbSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzMwNDgyNzkwLCJpYXQiOjE3MzAzOTYzOTAsImp0aSI6IjZkYzA4OWRmLWYzNDctNGIzYy04MTU2LTJiNzRkYjg1ZGIzNSIsInNjb3BlIjoiQURNSU4ifQ.qQ6ogbsdx-4h86BIMdqZF_nDbPrVWS_ePOQVQrWW_geuStKog80_WosJnS851hOZGR5FMstQgclIb70tuCHqyA';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
