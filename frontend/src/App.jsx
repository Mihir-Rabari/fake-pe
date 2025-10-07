import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WalletPage from './pages/WalletPage';
import MerchantDashboard from './pages/MerchantDashboard';
import DeveloperConsole from './pages/DeveloperConsole';
import PaymentPage from './pages/PaymentPage';
import TransactionHistory from './pages/TransactionHistory';
import PaymentDetails from './pages/PaymentDetails';
import SettingsPage from './pages/SettingsPage';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineIndicator from './components/OfflineIndicator';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <OfflineIndicator />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/dashboard" element={<MerchantDashboard />} />
          <Route path="/developer" element={<DeveloperConsole />} />
          <Route path="/pay/:paymentId" element={<PaymentPage />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/payment/:paymentId" element={<PaymentDetails />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
