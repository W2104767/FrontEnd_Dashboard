import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css';
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; //allows the use of bootstrap




// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//     <App />
//     </AuthProvider>
//   </StrictMode>,
// )
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>  {/* Wrap your app */}
      <App />
    </BrowserRouter>
  </StrictMode>
);