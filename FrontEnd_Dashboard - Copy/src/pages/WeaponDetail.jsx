import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/apiClient';

// export default function WeaponDetail() {
//   const { weaponId } = useParams();
//   const [weapon, setWeapon] = useState(null);

//   useEffect(() => {
//     const fetchWeapon = async () => {
//       try {
//         const response = await apiClient.get(`/weapons/${weaponId}`);
//         setWeapon(response.data);
//       } catch (error) {
//         console.error('Failed to fetch weapon details:', error);
//       }
//     };

//     fetchWeapon();
//   }, [weaponId]);

//   if (!weapon) return <div>Loading...</div>;

//   return (
//     <div className="container mt-5">
//       <h2>{weapon.name}</h2>
//       <img src={weapon.imageUrl || '/default-weapon.jpg'} alt={weapon.name} />
//       <p>{weapon.description}</p>
//       <Button variant="success">Add to Cart</Button>
//     </div>
//   );
// }

export default function WeaponDetail() {
    const { id } = useParams();  // Get the weapon ID from the URL
    const [weapon, setWeapon] = useState(null);  // State to hold weapon details
  
    useEffect(() => {
      const fetchWeapon = async () => {
        try {
          const response = await apiClient.get(`/weapons/${id}`);  // Fetch weapon by ID
          setWeapon(response.data);  // Set weapon details in state
        } catch (error) {
          console.error('Failed to fetch weapon details:', error);
        }
      };
      fetchWeapon();
    }, [id]);  // Re-run the effect when the `id` changes
  
    if (!weapon) return <div>Loading...</div>;  // Show loading while fetching data
  
    return (
      <div>
        <h1>{weapon.name}</h1>
        <img src={weapon.imageUrl} alt={weapon.name} />
        <p>{weapon.description}</p>
        {/* You can add more details like price, features, etc. */}
      </div>
    );
  }