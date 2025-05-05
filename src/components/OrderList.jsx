import { useState, useEffect } from 'react';
import { OrderService } from '@/services';
import ErrorAlert from '@/components/ui/ErrorAlert';
import Spinner from '@/components/ui/Spinner';
import { Link } from 'react-router-dom';

export default function OrderList({ customerId = null }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.getAll(customerId);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [customerId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await OrderService.delete(id);
      setOrders(prev => prev.filter(order => order.orderId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>
                <Link to={`/orders/${order.orderId}`}>
                  #{order.orderId}
                </Link>
              </td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.customerName || `Customer ${order.customerId}`}</td>
              <td>
                <span className={`badge bg-${getStatusBadgeColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link 
                    to={`/orders/${order.orderId}/edit`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(order.orderId)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}