import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullPage />; // Full-page spinner during auth check
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}