import apiClient from './apiClient';

export const WeaponService = {
  // Get all weapons
  async getAllWeapons() {
    try {
      const response = await apiClient.get('/weapons');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch weapons:', error);
      throw new Error(error.response?.data?.message || 'Failed to load weapons');
    }
  },

  // Get weapon by ID
  async getWeaponById(id) {
    try {
      const response = await apiClient.get(`/weapons/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch weapon ${id}:`, error);
      throw new Error(error.response?.data?.message || 'Weapon not found');
    }
  },

  // Add new weapon
  async addWeapon(weapon) {
    try {
      const response = await apiClient.post('/weapons', weapon);
      return response.data;
    } catch (error) {
      console.error('Failed to add weapon:', error);
      throw new Error(error.response?.data?.message || 'Failed to create weapon');
    }
  },

  // Update existing weapon
  async updateWeapon(id, weapon) {
    try {
      await apiClient.put(`/weapons/${id}`, weapon);
    } catch (error) {
      console.error(`Failed to update weapon ${id}:`, error);
      throw new Error(error.response?.data?.message || 'Failed to update weapon');
    }
  },

  // Delete weapon
  async deleteWeapon(id) {
    try {
      await apiClient.delete(`/weapons/${id}`);
    } catch (error) {
      console.error(`Failed to delete weapon ${id}:`, error);
      throw new Error(error.response?.data?.message || 'Failed to delete weapon');
    }
  }
};