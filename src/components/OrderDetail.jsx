import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrderService } from '@/services';
import ErrorAlert from '@/components/ui/ErrorAlert';
import Spinner from '@/components/ui/Spinner';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await OrderService.getById(id);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>Order #{order.orderId}</h3>
          <span className={`badge bg-${getStatusBadgeColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <p><strong>Customer ID:</strong> {order.customerId}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6 text-end">
              <h5>Total: ${order.totalAmount.toFixed(2)}</h5>
            </div>
          </div>

          <h5 className="mb-3">Order Items</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Weapon</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.weaponName}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusBadgeColor(status) {
  switch (status) {
    case 'Completed': return 'success';
    case 'Processing': return 'primary';
    case 'Cancelled': return 'danger';
    default: return 'warning';
  }
}