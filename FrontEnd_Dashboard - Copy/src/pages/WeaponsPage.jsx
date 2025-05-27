// import { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import apiClient from '../services/apiClient';
// import Button from '../components/Button';

// export default function WeaponsPage() {
//   const { user } = useAuth();
//   const [weapons, setWeapons] = useState([]);

//   const fetchWeapons = async () => {
//     try {
//       const response = await apiClient.get('/weapons');
//       setWeapons(response.data);
//     } catch (error) {
//       console.error('Failed to fetch weapons:', error);
//     }
//   };

//   const addWeapon = async () => {
//     await apiClient.post('/weapons', { name: 'New Weapon' });
//     fetchWeapons(); // Refresh list
//   };

//   return (
//     <div>
//       <h1>Weapons</h1>
//       <Button 
//         variant="primary" 
//         onClick={addWeapon}
//       >
//         Add Weapon
//       </Button>
//       {weapons.map((weapon) => (
//         <div key={weapon.id}>{weapon.name}</div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function WeaponsPage() {
  const { user } = useAuth();
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    fetchWeapons();
  }, []);

  const fetchWeapons = async () => {
    try {
      const response = await apiClient.get('/weapons');
      setWeapons(response.data);
    } catch (error) {
      console.error('Failed to fetch weapons:', error);
    }
  };

  const addWeapon = async () => {
    const newWeapon = { name: 'New Weapon', description: 'Newly added weapon' };
    await apiClient.post('/weapons', newWeapon);
    fetchWeapons(); // Refresh list after adding
  };

  const deleteWeapon = async (id) => {
    await apiClient.delete(`/weapons/${id}`);
    fetchWeapons(); // Refresh list after deleting
  };

  return (
    <div>
      <h1>Weapons</h1>
      <Button variant="primary" onClick={addWeapon}>Add Weapon</Button>
      {weapons.map((weapon) => (
        <div key={weapon.id} className="weapon-item">
          <h3>{weapon.name}</h3>
          <p>{weapon.description}</p>
          <Link to={`/weapons/${weapon.id}`} className="btn btn-primary">View More</Link>
          <Button variant="danger" onClick={() => deleteWeapon(weapon.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}