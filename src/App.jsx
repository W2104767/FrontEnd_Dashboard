import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import WeaponsPage from './pages/WeaponsPage';
import OrdersPage from './pages/OrdersPage';
import Navbar from './components/Navbar';
import './App.css';


export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/weapons" element={<WeaponsPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}


