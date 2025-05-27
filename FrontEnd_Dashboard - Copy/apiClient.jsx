import axios from 'axios'; // AXios for Api calls

import axios from 'axios';

const apiClient = axios.create({

   baseURL: 'http://localhost:5104'
  //baseURL: import.meta.env.VITE_API_URL,  // Uses .env file dynamically
  //timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  //headers: {
    //'Content-Type': 'application/json'
  //}
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Backend is unreachable. Is it running on port 5104?');
      throw new Error('Server connection failed. Try again later.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;