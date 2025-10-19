import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  Code, 
  Settings, 
  LogOut,
  TrendingUp,
  DollarSign,
  Activity,
  Clock
} from 'lucide-react';
import Logo from '../components/Logo';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function MerchantDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const [stats, setStats] = useState({
    totalPayments: 0,
    totalAmount: 0,
    successRate: 0,
    activeProjects: 0
  });
  const [loading, setLoading] = useState(true);

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
    fetchMerchantData(parsedUser, token);
  }, [navigate]);

  const fetchMerchantData = async (userData, token) => {
    try {
      // Fetch merchant details
      if (userData.merchantId) {
        const merchantResponse = await axios.get(
          `${API_URL}/api/v1/merchants/${userData.merchantId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMerchant(merchantResponse.data.merchant);

        // Fetch stats
        const statsResponse = await axios.get(
          `${API_URL}/api/v1/merchants/${userData.merchantId}/stats`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(statsResponse.data.stats);
      }
    } catch (err) {
      console.error('Failed to load merchant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fakepe-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-8 h-8 text-fakepe-primary animate-pulse mx-auto mb-2" />
          <p className="text-fakepe-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fakepe-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-fakepe-surface border-r border-fakepe-border">
        <div className="p-6">
          <Logo size="md" showText={true} />
        </div>
        <nav className="px-4 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-fakepe-primary bg-fakepe-primary/10 rounded-lg font-medium transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-fakepe-text-secondary hover:bg-fakepe-surface hover:text-fakepe-text-primary rounded-lg transition"
          >
            <CreditCard className="w-5 h-5" />
            Payments
          </a>
          <Link
            to="/developer"
            className="flex items-center gap-3 px-4 py-3 text-fakepe-text-secondary hover:bg-fakepe-surface hover:text-fakepe-text-primary rounded-lg transition"
          >
            <Code className="w-5 h-5" />
            Developer
          </Link>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-fakepe-text-secondary hover:bg-fakepe-surface hover:text-fakepe-text-primary rounded-lg transition"
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-fakepe-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-fakepe-text-secondary hover:bg-fakepe-surface hover:text-fakepe-text-primary rounded-lg w-full transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-fakepe-surface border-b border-fakepe-border">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-fakepe-text-primary">Dashboard</h1>
                <p className="text-sm text-fakepe-text-secondary mt-1">Welcome back, {user?.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right px-4 py-2 bg-fakepe-background rounded-lg border border-fakepe-border">
                  <p className="text-xs text-fakepe-text-secondary uppercase tracking-wider mb-1">Merchant ID</p>
                  <p className="text-sm font-mono font-medium text-fakepe-primary">{user?.merchantId}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6 hover:border-fakepe-primary/50 transition group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fakepe-primary/10 rounded-lg flex items-center justify-center group-hover:bg-fakepe-primary/20 transition">
                  <CreditCard className="w-6 h-6 text-fakepe-primary" />
                </div>
                <span className="text-xs text-fakepe-success font-medium">+12%</span>
              </div>
              <p className="text-sm text-fakepe-text-secondary mb-1">Total Payments</p>
              <p className="text-3xl font-bold text-fakepe-text-primary">{stats.totalPayments}</p>
            </div>

            <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6 hover:border-fakepe-primary/50 transition group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fakepe-success/10 rounded-lg flex items-center justify-center group-hover:bg-fakepe-success/20 transition">
                  <DollarSign className="w-6 h-6 text-fakepe-success" />
                </div>
                <span className="text-xs text-fakepe-success font-medium">+8%</span>
              </div>
              <p className="text-sm text-fakepe-text-secondary mb-1">Total Volume</p>
              <p className="text-3xl font-bold text-fakepe-text-primary">₹{stats.totalAmount.toLocaleString()}</p>
            </div>

            <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6 hover:border-fakepe-primary/50 transition group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fakepe-accent/10 rounded-lg flex items-center justify-center group-hover:bg-fakepe-accent/20 transition">
                  <TrendingUp className="w-6 h-6 text-fakepe-accent" />
                </div>
                <span className="text-xs text-fakepe-success font-medium">+2%</span>
              </div>
              <p className="text-sm text-fakepe-text-secondary mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-fakepe-text-primary">{stats.successRate}%</p>
            </div>

            <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6 hover:border-fakepe-primary/50 transition group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-fakepe-primary/10 rounded-lg flex items-center justify-center group-hover:bg-fakepe-primary/20 transition">
                  <Code className="w-6 h-6 text-fakepe-primary" />
                </div>
              </div>
              <p className="text-sm text-fakepe-text-secondary mb-1">Active Projects</p>
              <p className="text-3xl font-bold text-fakepe-text-primary">{stats.activeProjects}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6 mb-8">
            <h2 className="text-lg font-semibold text-fakepe-text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/developer"
                className="flex items-center gap-3 p-4 border-2 border-fakepe-border rounded-lg hover:border-fakepe-primary hover:bg-fakepe-primary/5 transition group"
              >
                <Code className="w-6 h-6 text-fakepe-primary" />
                <div>
                  <p className="font-medium text-fakepe-text-primary group-hover:text-fakepe-primary transition">Developer Console</p>
                  <p className="text-sm text-fakepe-text-secondary">Manage API keys & projects</p>
                </div>
              </Link>
              <a
                href="#"
                className="flex items-center gap-3 p-4 border-2 border-fakepe-border rounded-lg hover:border-fakepe-primary hover:bg-fakepe-primary/5 transition group"
              >
                <CreditCard className="w-6 h-6 text-fakepe-primary" />
                <div>
                  <p className="font-medium text-fakepe-text-primary group-hover:text-fakepe-primary transition">View Payments</p>
                  <p className="text-sm text-fakepe-text-secondary">Transaction history</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-4 border-2 border-fakepe-border rounded-lg hover:border-fakepe-primary hover:bg-fakepe-primary/5 transition group"
              >
                <Settings className="w-6 h-6 text-fakepe-primary" />
                <div>
                  <p className="font-medium text-fakepe-text-primary group-hover:text-fakepe-primary transition">Settings</p>
                  <p className="text-sm text-fakepe-text-secondary">Configure webhooks</p>
                </div>
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6">
            <h2 className="text-lg font-semibold text-fakepe-text-primary mb-4">Recent Activity</h2>
            <div className="text-center py-12 text-fakepe-text-secondary">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">Start by creating your first project in the Developer Console</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantDashboard;
