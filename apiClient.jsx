import axios from 'axios'; // AXios for Api calls

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // For authenticated routes
    }
  });
  
  // Request interceptor for auth tokens
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
 feature/weaponService
  export default apiClient;

  export default apiClient;
 
