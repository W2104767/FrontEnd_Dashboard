import apiClient from './apiClient';

export const AuthService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/account/login', {
        email,
        password
      });
      
      // Store the token (assuming JWT response)
      localStorage.setItem('token', response.data.token);
      
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(
        error.response?.data?.message || 
        'Invalid email or password. Please try again.'
      );
    }
  },

  async register(email, password) {
    try {
      const response = await apiClient.post('/account/register', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
    }
  },

  logout() {
    localStorage.removeItem('token');
    // Redirect or perform other cleanup
  },

  getCurrentToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getCurrentToken();
  }
};