import { useAuth } from '../contexts/AuthContext';

export const useAuthActions = () => {
  const { login, register, logout } = useAuth();
  
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (error) {
      throw error; // Propagate to UI for display
    }
  };

  return { handleLogin, register, logout };
};