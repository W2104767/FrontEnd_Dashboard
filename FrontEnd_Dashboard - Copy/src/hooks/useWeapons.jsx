// import { useState } from 'react';
// import { WeaponService } from '../services/weaponService';

// export const useWeapons = () => {
//   const [weapons, setWeapons] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const loadWeapons = async () => {
//     setIsLoading(true);
//     try {
//       const data = await WeaponService.getAllWeapons();
//       setWeapons(data);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { weapons, isLoading, loadWeapons };
// };

import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

export function useWeapons() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeapons = async () => {
    try {
      const response = await apiClient.get('/weapons');
      setWeapons(response.data);
    } catch (error) {
      console.error('Failed to fetch weapons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  return { weapons, fetchWeapons, loading };
}