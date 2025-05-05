import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="navbar bg-light">
      <Link to="/">Home</Link>
      <Link to="/weapons">Weapons</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};