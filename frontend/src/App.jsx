import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WalletPage from './pages/WalletPage';
import MerchantDashboard from './pages/MerchantDashboard';
import DeveloperConsole from './pages/DeveloperConsole';
import PaymentPage from './pages/PaymentPage';
import TransactionHistory from './pages/TransactionHistory';
import PaymentDetails from './pages/PaymentDetails';
import SettingsPage from './pages/SettingsPage';
import WebhookLogs from './pages/WebhookLogs';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineIndicator from './components/OfflineIndicator';

// Documentation pages
import DocsLayout from './pages/docs/DocsLayout';
import GettingStarted from './pages/docs/GettingStarted';
import ApiDocs from './pages/docs/ApiDocs';
import SDKGuide from './pages/docs/SDKGuide';
import QuickReference from './pages/docs/QuickReference';
import SelfHosting from './pages/docs/SelfHosting';
import ApiUsage from './pages/docs/ApiUsage';
import Examples from './pages/docs/Examples';
import DocsManager from './pages/DocsManager';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <OfflineIndicator />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Documentation routes */}
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Navigate to="/docs/getting-started" replace />} />
            <Route path="getting-started" element={<GettingStarted />} />
            <Route path="api" element={<ApiDocs />} />
            <Route path="sdk" element={<SDKGuide />} />
            <Route path="quick-reference" element={<QuickReference />} />
            <Route path="self-hosting" element={<SelfHosting />} />
            <Route path="api-usage" element={<ApiUsage />} />
            <Route path="examples" element={<Examples />} />
          </Route>
          
          {/* Documentation Manager (Admin) */}
          <Route path="/docs-manager" element={<DocsManager />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/dashboard" element={<MerchantDashboard />} />
          <Route path="/developer" element={<DeveloperConsole />} />
          <Route path="/pay/:paymentId" element={<PaymentPage />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/payment/:paymentId" element={<PaymentDetails />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/webhooks" element={<WebhookLogs />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
