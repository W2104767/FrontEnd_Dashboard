import { useEffect, useState } from 'react';
import { WeaponService } from '../services/weaponService';

export default function WeaponList() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeapons = async () => {
      try {
        const data = await WeaponService.getAllWeapons();
        setWeapons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadWeapons();
  }, []);

  if (loading) return <div>Loading weapons...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {weapons.map(weapon => (
        <li key={weapon.id}>
          {weapon.name} - ${weapon.price}
        </li>
      ))}
    </ul>
  );
}