import { useState } from 'react';
import { WeaponService } from '@/services/weaponService';
import ErrorAlert from '@/components/ui/ErrorAlert';

export default function WeaponForm({ 
  initialData = null, 
  onSuccess,
  categories = [], 
  manufacturers = [] 
}) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    price: 0,
    stockQuantity: 0,
    categoryId: '',
    manufacturerId: ''
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be positive';
    }
    if (formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock cannot be negative';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    if (!formData.manufacturerId && !initialData) {
      newErrors.manufacturerId = 'Manufacturer is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setApiError(null);
    
    try {
      if (initialData) {
        await WeaponService.update(initialData.id, formData);
      } else {
        await WeaponService.create(formData);
      }
      onSuccess();
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      {apiError && <ErrorAlert message={apiError} className="mb-3" />}

      <div className="mb-3">
        <label className="form-label">Name*</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          minLength={3}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Price*</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              step="0.01"
              min="0.01"
              required
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
        </div>
        <div className="col">
          <label className="form-label">Stock*</label>
          <input
            type="number"
            className={`form-control ${errors.stockQuantity ? 'is-invalid' : ''}`}
            value={formData.stockQuantity}
            onChange={(e) => setFormData({...formData, stockQuantity: parseInt(e.target.value) || 0})}
            min="0"
            required
          />
          {errors.stockQuantity && <div className="invalid-feedback">{errors.stockQuantity}</div>}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Category*</label>
          <select
            className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
            value={formData.categoryId}
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
        </div>
        {!initialData && (
          <div className="col">
            <label className="form-label">Manufacturer*</label>
            <select
              className={`form-select ${errors.manufacturerId ? 'is-invalid' : ''}`}
              value={formData.manufacturerId}
              onChange={(e) => setFormData({...formData, manufacturerId: e.target.value})}
              required
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
            {errors.manufacturerId && <div className="invalid-feedback">{errors.manufacturerId}</div>}
          </div>
        )}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            {initialData ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          initialData ? 'Update Weapon' : 'Create Weapon'
        )}
      </button>
    </form>
  );
}