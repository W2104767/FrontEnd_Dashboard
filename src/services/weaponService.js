import apiClient from './apiClient';

export const WeaponService = {
  // GET all weapons with optional category filter
  getAll: async (categoryId = null) => {
    try {
      const params = categoryId ? { categoryId } : {};
      const response = await apiClient.get('/weapons', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Failed to fetch weapons');
    }
  },

  // GET weapon by ID with related data
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/weapons/${id}?includeRelated=true`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Weapon not found');
      }
      throw new Error('Failed to fetch weapon details');
    }
  },

  // CREATE weapon with validation
  create: async (weaponData) => {
    try {
      const response = await apiClient.post('/weapons', weaponData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        // Map backend validation errors to frontend format
        const errors = error.response.data.errors || {};
        throw new Error(
          Object.entries(errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n')
        );
      }
      throw new Error('Failed to create weapon');
    }
  },

  // UPDATE weapon with partial data
  update: async (id, weaponData) => {
    try {
      const response = await apiClient.patch(`/weapons/${id}`, weaponData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('Invalid weapon data');
      }
      if (error.response?.status === 404) {
        throw new Error('Weapon not found');
      }
      throw new Error('Failed to update weapon');
    }
  },

  // DELETE weapon
  delete: async (id) => {
    try {
      await apiClient.delete(`/weapons/${id}`);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Weapon not found');
      }
      throw new Error('Failed to delete weapon');
    }
  }
};