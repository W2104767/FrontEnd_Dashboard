import { useState, useEffect } from 'react';
import { WeaponService } from '@/services/weaponService';
import ErrorAlert from '@/components/ui/ErrorAlert';
import Spinner from '@/components/ui/Spinner';

export default function WeaponList() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeapons = async () => {
      try {
        const data = await WeaponService.getAll();
        setWeapons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadWeapons();
  }, []);

  const handleDelete = async (id) => {
    try {
      await WeaponService.delete(id);
      setWeapons(prev => prev.filter(w => w.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorAlert message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      <h2>Weapons</h2>
      <ul className="list-group">
        {weapons.map(weapon => (
          <li key={weapon.id} className="list-group-item d-flex justify-content-between">
            <div>
              <h5>{weapon.name}</h5>
              <p>Price: ${weapon.price}</p>
            </div>
            <button 
              className="btn btn-danger"
              onClick={() => handleDelete(weapon.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}