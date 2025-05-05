import { createContext, useState, useContext } from 'react';

// 1. Create context
const AuthContext = createContext();

// 2. Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function (update state + call API)
  const login = async (email, password) => {
    const response = await fakeAuthAPI(email, password); // Replace with your API call
    setUser(response.data.user);
  };

  const logout = () => setUser(null);

  // 3. Value exposed to consumers
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};