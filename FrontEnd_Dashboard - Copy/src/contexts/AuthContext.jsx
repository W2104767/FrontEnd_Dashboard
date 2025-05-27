import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

// 1. Create Context
const AuthContext = createContext();

// 2. Create Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token); // Verify token with backend
    } else {
      setIsLoading(false);
    }
  }, []);

  // Validate token with backend
  const validateToken = async (token) => {
    try {
      const response = await apiClient.get('/account/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      logout(); // Clear invalid token
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/account/login', { email, password });
      localStorage.setItem('token', response.data.token);
      await validateToken(response.data.token);
      navigate('/dashboard'); // Redirect after login
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      const response = await apiClient.post('/account/register', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  // Exposed values
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};