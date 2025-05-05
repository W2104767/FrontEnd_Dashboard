import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WeaponService } from '@/services/weaponService';
import ErrorAlert from '@/components/ui/ErrorAlert';
import Spinner from '@/components/ui/Spinner';

export default function WeaponDetail() {
  const { id } = useParams();
  const [weapon, setWeapon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const data = await WeaponService.getById(id);
        setWeapon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeapon();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!weapon) return <div>Weapon not found</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{weapon.name}</h3>
        <div className="row mt-4">
          <div className="col-md-6">
            <p><strong>Price:</strong> ${weapon.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {weapon.stockQuantity}</p>
          </div>
          <div className="col-md-6">
            {weapon.category && (
              <p><strong>Category:</strong> {weapon.category.name}</p>
            )}
            {weapon.manufacturer && (
              <p><strong>Manufacturer:</strong> {weapon.manufacturer.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}