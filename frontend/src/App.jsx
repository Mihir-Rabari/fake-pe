import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WalletPage from './pages/WalletPage';
import MerchantDashboard from './pages/MerchantDashboard';
import DeveloperConsole from './pages/DeveloperConsole';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/dashboard" element={<MerchantDashboard />} />
        <Route path="/developer" element={<DeveloperConsole />} />
        <Route path="/pay/:paymentId" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
