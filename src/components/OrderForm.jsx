import { useState, useEffect } from 'react';
import { OrderService, CustomerService, WeaponService } from '@/services';
import ErrorAlert from '@/components/ui/ErrorAlert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function OrderForm({ 
  initialData = null, 
  onSuccess,
  onCancel 
}) {
  const [formData, setFormData] = useState(initialData || {
    customerId: '',
    orderDate: new Date(),
    status: 'Pending',
    totalAmount: 0,
    items: []
  });

  const [customers, setCustomers] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, weaponsRes] = await Promise.all([
          CustomerService.getAll(),
          WeaponService.getAll()
        ]);
        setCustomers(customersRes);
        setWeapons(weaponsRes);
      } catch (err) {
        setApiError(err.message);
      }
    };
    fetchData();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.customerId) newErrors.customerId = 'Customer is required';
    if (!formData.orderDate) newErrors.orderDate = 'Date is required';
    if (formData.totalAmount <= 0) newErrors.totalAmount = 'Amount must be positive';
    if (!formData.status) newErrors.status = 'Status is required';
    if (formData.items.length === 0) newErrors.items = 'Add at least one item';
    return newErrors;
  };

  const handleAddItem = () => {
    if (!selectedWeapon || quantity < 1) return;

    const newItem = {
      weaponId: selectedWeapon.id,
      name: selectedWeapon.name,
      price: selectedWeapon.price,
      quantity
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      totalAmount: prev.totalAmount + (selectedWeapon.price * quantity)
    }));

    setSelectedWeapon(null);
    setQuantity(1);
  };

  const handleRemoveItem = (index) => {
    const item = formData.items[index];
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
      totalAmount: prev.totalAmount - (item.price * item.quantity)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (initialData) {
        await OrderService.update(initialData.orderId, formData);
      } else {
        await OrderService.create(formData);
      }
      onSuccess();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      {apiError && <ErrorAlert message={apiError} className="mb-3" />}

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Customer*</label>
          <select
            className={`form-select ${errors.customerId ? 'is-invalid' : ''}`}
            value={formData.customerId}
            onChange={(e) => setFormData({...formData, customerId: e.target.value})}
            required
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customerId && <div className="invalid-feedback">{errors.customerId}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Status*</label>
          <select
            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {errors.status && <div className="invalid-feedback">{errors.status}</div>}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Order Date*</label>
          <DatePicker
            selected={formData.orderDate}
            onChange={(date) => setFormData({...formData, orderDate: date})}
            className={`form-control ${errors.orderDate ? 'is-invalid' : ''}`}
            dateFormat="yyyy-MM-dd"
            required
          />
          {errors.orderDate && <div className="invalid-feedback">{errors.orderDate}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Total Amount</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className={`form-control ${errors.totalAmount ? 'is-invalid' : ''}`}
              value={formData.totalAmount.toFixed(2)}
              readOnly
            />
            {errors.totalAmount && <div className="invalid-feedback">{errors.totalAmount}</div>}
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Order Items</div>
        <div className="card-body">
          {errors.items && <div className="alert alert-danger">{errors.items}</div>}

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <select
                className="form-select"
                value={selectedWeapon?.id || ''}
                onChange={(e) => {
                  const weapon = weapons.find(w => w.id === parseInt(e.target.value));
                  setSelectedWeapon(weapon || null);
                }}
              >
                <option value="">Select Weapon</option>
                {weapons.map(weapon => (
                  <option key={weapon.id} value={weapon.id}>
                    {weapon.name} (${weapon.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="col-md-3">
              <button 
                type="button" 
                className="btn btn-outline-primary w-100"
                onClick={handleAddItem}
                disabled={!selectedWeapon}
              >
                Add Item
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Weapon</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData ? 'Update Order' : 'Create Order'
          )}
        </button>
      </div>
    </form>
  );
}