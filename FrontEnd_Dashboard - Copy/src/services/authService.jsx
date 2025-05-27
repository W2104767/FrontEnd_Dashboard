import { useState } from 'react';

export const AuthService = {
  // Register with email verification
  register: async (email, password) => {
    const response = await apiClient.post('/account/register', { 
      email, 
      password 
    });
    return response.data; // "User registered successfully..."
  },

  // Login with JWT
  login: async (email, password) => {
    const response = await apiClient.post('/account/login', {
      email,
      password
    });
    return {
      token: response.data.Token,
      user: { email } // Add more user data if returned
    };
  },

  // Logout (frontend-only)
  logout: () => {
    localStorage.removeItem('token');
  },

  // Verify email (optional frontend handling)
  verifyEmail: async (userId, token) => {
    return await apiClient.get(
      `/account/verify-email?userId=${userId}&token=${token}`
    );
  }
};

