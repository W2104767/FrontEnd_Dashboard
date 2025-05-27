import { useState } from 'react';
import apiClient from '../services/apiClient';

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (endpoint, method = 'GET', body = null) => {
    setIsLoading(true);
    try {
      const response = await apiClient[method.toLowerCase()](endpoint, body);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
};