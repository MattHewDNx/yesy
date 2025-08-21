// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// We will create these next
// import DashboardPage from './pages/DashboardPage';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* The Dashboard route will be protected */}
      <Route path="/" element={<h1>Dashboard Page (Protected)</h1>} />
    </Routes>
  );
}
export default App;