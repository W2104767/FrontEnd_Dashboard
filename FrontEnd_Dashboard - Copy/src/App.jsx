import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WeaponsPage from './pages/WeaponsPage';
import OrdersPage from './pages/OrdersPage';
import Navbar from './components/Navbar';
import WeaponDetail from './pages/WeaponDetail'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setSessionTimeout, clearSessionTimeout } from './utils/sessionUtils';

export default function App() {
  useEffect(() => {
    // Call your session management utility here, e.g., set up session timeout
    setSessionTimeout(() => {
      // Logic to handle user logout when session expires
    });

    return () => {
      // Clean up timeout on component unmount
      clearSessionTimeout();
    };
  }, []); // Empty array means this effect runs only once after initial render

  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/weapons" element={<WeaponsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/weapons/:id" element={<WeaponDetail />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}