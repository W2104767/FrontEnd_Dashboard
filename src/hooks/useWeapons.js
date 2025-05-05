import { useState, useEffect } from 'react';
import { WeaponService } from '@/services/weaponService';

export default function useWeapons() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeapons = async () => {
    setLoading(true);
    try {
      const data = await WeaponService.getAll();
      setWeapons(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  const createWeapon = async (weaponData) => {
    try {
      const newWeapon = await WeaponService.create(weaponData);
      setWeapons(prev => [...prev, newWeapon]);
      return newWeapon;
    } catch (err) {
      throw err;
    }
  };

  return { weapons, loading, error, createWeapon, fetchWeapons };
}