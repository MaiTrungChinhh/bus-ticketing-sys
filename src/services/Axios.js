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
      'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJidXMtdGlja2V0LmNvbSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzMxMTM4MDIzLCJpYXQiOjE3MzEwNTE2MjMsImp0aSI6IjNmNGMzNTVjLTc3MjQtNDI1NC1hZjU4LWMzMjdlZDlkODNmOCIsInNjb3BlIjoiQURNSU4ifQ.Ao_fjzekhFzWLFVLTtzYi6900XHyzyLX_VQKU9d_vvDmE16qAQpHKSy6qbM4P45Zbf1ZTWS1_ES-FBZZoDoHaA';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
