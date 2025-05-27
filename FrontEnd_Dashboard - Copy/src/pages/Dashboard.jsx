import { Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Container className="py-4">
      <h1>Welcome to Your Dashboard</h1>
      
      {user && (
        <div className="mb-4">
          <h2>User Information</h2>
          <p>Email: {user.email}</p>
          {/* Add other user data as needed */}
        </div>
      )}

      <div className="d-flex gap-3">
        <button 
          onClick={logout}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
    </Container>
  );
}