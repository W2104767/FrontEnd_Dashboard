
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';
import '../styles/Home.css';  // For custom styles 

// export default function Home() {
//   return (
//     <div className="container mt-5">
//       <div className="hero-section text-center">
//         <h1 className="display-4 text-white">Welcome to WeaponShop</h1>
//         <p className="lead text-white">
//           Explore our wide range of weapons for all your needs.
//         </p>
//         <Link to="/weapons" className="btn btn-danger btn-lg mt-3">Browse Weapons</Link>
//       </div>

//       <div className="featured-section mt-5">
//         <h2 className="text-center">Featured Weapons</h2>
//         <div className="row">
//           {/* Replace with dynamic data */}
//           <div className="col-md-4">
//             <div className="card">
//               <img src="/path-to-image.jpg" className="card-img-top" alt="Featured Weapon" />
//               <div className="card-body">
//                 <h5 className="card-title">Assault Rifle</h5>
//                 <p className="card-text">The perfect weapon for long-range battles.</p>
//                 <Link to="/weapons" className="btn btn-primary">View More</Link>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="/path-to-image.jpg" className="card-img-top" alt="Featured Weapon" />
//               <div className="card-body">
//                 <h5 className="card-title">Sniper Rifle</h5>
//                 <p className="card-text">Long-range precision and power.</p>
//                 <Link to="/weapons" className="btn btn-primary">View More</Link>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="/path-to-image.jpg" className="card-img-top" alt="Featured Weapon" />
//               <div className="card-body">
//                 <h5 className="card-title">Handgun</h5>
//                 <p className="card-text">Compact and reliable for close combat.</p>
//                 <Link to="/weapons" className="btn btn-primary">View More</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="categories-section mt-5">
//         <h2 className="text-center">Browse by Category</h2>
//         <div className="row">
//           <div className="col-md-6">
//             <div className="card bg-light">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Rifles</h5>
//                 <p className="card-text">Find the best rifles for hunting, sport, and combat.</p>
//                 <Link to="/weapons" className="btn btn-dark">Browse Rifles</Link>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="card bg-light">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Pistols</h5>
//                 <p className="card-text">Compact, powerful pistols for personal defense.</p>
//                 <Link to="/weapons" className="btn btn-dark">Browse Pistols</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function Home() {
  const [featuredWeapons, setFeaturedWeapons] = useState([]);
  const [error, setError] = useState(null);

  // Fetch weapons from the API
  const fetchWeapons = async () => {
    try {
      const response = await apiClient.get('http://localhost:5104/api/weapons'); 
      if (Array.isArray(response.data)) {
        
        setFeaturedWeapons(response.data.slice(0, 3)); 
      } else {
        setError('Invalid data format received.');
      }
    } catch (error) {
      setError('Failed to fetch weapons');
      console.error('Error fetching weapons:', error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchWeapons();
  }, []);

   // Memoized refresh function to trigger data refresh
   const refreshData = useCallback(() => {
    setDataVersion((v) => v + 1); 
  }, []);

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="hero-section text-center">
        <h1 className="display-4 text-white">Welcome to WeaponShop</h1>
        <p className="lead text-white">Explore our wide range of weapons for all your needs.</p>
        <Link to="/weapons" className="btn btn-danger btn-lg mt-3">Browse Weapons</Link>
      </div>

      {/* Featured Weapons Section */}
      <div className="featured-section mt-5">
        <h2 className="text-center">Featured Weapons</h2>
        {error && <p className="text-danger text-center">{error}</p>} {/* Display error if fetch fails */}
        <div className="row">
          {/* Dynamically render featured weapons */}
          {featuredWeapons.length > 0 ? (
            featuredWeapons.map((weapon) => (
              <div key={weapon.id} className="col-md-4">
                <div className="card">
                  <img 
                    src={weapon.imageUrl ||'../utils/PlaceHolder.jpg'} // Default placeholder if no image
                    className="card-img-top"
                    alt={weapon.name} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{weapon.name}</h5>
                    <p className="card-text">{weapon.description}</p>
                    <Link to={`/weapons/${weapon.id}`} className="btn btn-primary">View More</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Loading featured weapons...</p>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section mt-5">
        <h2 className="text-center">Browse by Category</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h5 className="card-title">Rifles</h5>
                <p className="card-text">Find the best rifles for hunting, sport, and combat.</p>
                <Link to="/weapons?category=rifles" className="btn btn-dark">Browse Rifles</Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h5 className="card-title">Pistols</h5>
                <p className="card-text">Compact, powerful pistols for personal defense.</p>
                <Link to="/weapons?category=pistols" className="btn btn-dark">Browse Pistols</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}