import apiClient from './apiClient';

export const OrderService = {
  // GET all orders with optional customer filter
  getAll: async (customerId = null) => {
    try {
      const params = customerId ? { customerId } : {};
      const response = await apiClient.get('/orders', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Failed to fetch orders');
    }
  },

  // GET order with nested items
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}?includeItems=true`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error('Failed to fetch order details');
    }
  },

  // CREATE order with items
  create: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', {
        ...orderData,
        orderDate: new Date(orderData.orderDate).toISOString()
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        const errors = error.response.data.errors || {};
        throw new Error(
          Object.entries(errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n')
        );
      }
      throw new Error('Failed to create order');
    }
  },

  // UPDATE order status/amount
  update: async (id, updateData) => {
    try {
      const response = await apiClient.patch(`/orders/${id}`, {
        ...updateData,
        orderDate: updateData.orderDate && new Date(updateData.orderDate).toISOString()
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('Invalid order data');
      }
      if (error.response?.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error('Failed to update order');
    }
  },

  // DELETE order
  delete: async (id) => {
    try {
      await apiClient.delete(`/orders/${id}`);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error('Failed to delete order');
    }
  }
};