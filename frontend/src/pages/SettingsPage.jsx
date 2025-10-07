import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Settings, Save, LogOut, LayoutDashboard, Code } from 'lucide-react';
import Logo from '../components/Logo';
import Toast from '../components/Toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    webhookUrl: ''
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailOnPayment: true,
    emailOnRefund: true,
    emailOnWebhookFailure: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'merchant') {
      navigate('/wallet');
      return;
    }

    setUser(parsedUser);
    setAccountData({
      name: parsedUser.name,
      email: parsedUser.email,
      webhookUrl: ''
    });

    fetchMerchantData(parsedUser, token);
  }, [navigate]);

  const fetchMerchantData = async (userData, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/merchants/${userData.merchantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMerchant(response.data.merchant);
      setAccountData(prev => ({
        ...prev,
        webhookUrl: response.data.merchant.webhookUrl || ''
      }));
    } catch (err) {
      console.error('Failed to load merchant data:', err);
    }
  };

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${API_URL}/api/v1/merchants/${user.merchantId}`,
        {
          name: accountData.name,
          webhookUrl: accountData.webhookUrl
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setToast({ type: 'success', message: 'Account settings updated successfully' });
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (securityData.newPassword !== securityData.confirmPassword) {
      setToast({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    if (securityData.newPassword.length < 8) {
      setToast({ type: 'error', message: 'Password must be at least 8 characters' });
      return;
    }

    setLoading(true);
    // Password change logic would go here
    setTimeout(() => {
      setToast({ type: 'success', message: 'Password changed successfully' });
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <Logo size="md" />
        </div>
        <nav className="px-4 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/developer"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <Code className="w-5 h-5" />
            Developer
          </Link>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600">Manage your account and preferences</p>
          </div>
        </header>

        <div className="p-8 max-w-4xl">
          {/* Account Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
            <form onSubmit={handleAccountUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Merchant ID
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <code className="text-sm text-gray-600">{user?.merchantId}</code>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={accountData.name}
                  onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={accountData.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={accountData.webhookUrl}
                  onChange={(e) => setAccountData({ ...accountData, webhookUrl: e.target.value })}
                  placeholder="https://your-site.com/webhook"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Receive payment notifications at this URL
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </form>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Change Password
              </button>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Payment Notifications</p>
                  <p className="text-sm text-gray-600">Receive email when a payment is completed</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailOnPayment}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailOnPayment: e.target.checked
                  })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Refund Notifications</p>
                  <p className="text-sm text-gray-600">Receive email when a refund is processed</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailOnRefund}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailOnRefund: e.target.checked
                  })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Webhook Failure Alerts</p>
                  <p className="text-sm text-gray-600">Receive email when webhook delivery fails</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailOnWebhookFailure}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailOnWebhookFailure: e.target.checked
                  })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* API Rate Limits */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">API Rate Limits</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Creation</span>
                <span className="text-sm font-medium text-gray-900">100 req/min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">General API Calls</span>
                <span className="text-sm font-medium text-gray-900">300 req/min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Webhook Retries</span>
                <span className="text-sm font-medium text-gray-900">10 attempts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
