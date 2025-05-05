import { useState, useEffect } from 'react';
import { OrderService } from '@/services/orderService';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await OrderService.getAll();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const createOrder = async (orderData) => {
    try {
      const newOrder = await OrderService.create(orderData);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      throw err;
    }
  };

  const deleteOrder = async (id) => {
    try {
      await OrderService.delete(id);
      setOrders(prev => prev.filter(order => order.orderId !== id));
    } catch (err) {
      throw err;
    }
  };

  return { orders, loading, error, createOrder, deleteOrder, fetchOrders };
}

