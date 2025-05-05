import { useAuth } from '@/contexts/AuthContext';


export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}