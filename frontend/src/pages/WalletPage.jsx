import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, RefreshCw, LogOut } from 'lucide-react';
import Logo from '../components/Logo';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function WalletPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTopup, setShowTopup] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [topupAmount, setTopupAmount] = useState('');
  const [transferData, setTransferData] = useState({ toUserId: '', amount: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchWallet(parsedUser.userId, token);
  }, [navigate]);

  const fetchWallet = async (userId, token) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/wallets/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWallet(response.data.wallet);
    } catch (err) {
      setError('Failed to load wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${API_URL}/api/v1/wallets/topup`,
        { userId: user.userId, amount: parseFloat(topupAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(`Successfully added ₹${topupAmount} to wallet`);
      setTopupAmount('');
      setShowTopup(false);
      fetchWallet(user.userId, token);
    } catch (err) {
      setError(err.response?.data?.error || 'Top-up failed');
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${API_URL}/api/v1/wallets/transfer`,
        {
          fromUserId: user.userId,
          toUserId: transferData.toUserId,
          amount: parseFloat(transferData.amount)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(`Successfully transferred ₹${transferData.amount}`);
      setTransferData({ toUserId: '', amount: '' });
      setShowTransfer(false);
      fetchWallet(user.userId, token);
    } catch (err) {
      setError(err.response?.data?.error || 'Transfer failed');
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
          <RefreshCw className="w-8 h-8 text-fakepe-primary animate-spin mx-auto mb-2" />
          <p className="text-fakepe-text-secondary">Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fakepe-background">
      {/* Header */}
      <header className="bg-fakepe-surface border-b border-fakepe-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showText={true} />
            <div className="flex items-center gap-4">
              <span className="text-sm text-fakepe-text-secondary">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-fakepe-text-secondary hover:text-fakepe-primary transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-fakepe-success/10 border border-fakepe-success/30 rounded-lg text-fakepe-success">
            {success}
          </div>
        )}

        {/* Wallet Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-fakepe-primary to-fakepe-success rounded-2xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-8 h-8" />
                <h2 className="text-2xl font-bold">My Wallet</h2>
              </div>
              <div className="mb-2">
                <p className="text-white/80 text-sm">Available Balance</p>
                <p className="text-5xl font-bold">₹{wallet?.balance?.toFixed(2) || '0.00'}</p>
              </div>
              <p className="text-white/80 text-sm">User ID: {user?.userId}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setShowTopup(true)}
              className="flex items-center justify-center gap-2 p-4 bg-fakepe-surface rounded-lg border-2 border-fakepe-border hover:border-fakepe-primary hover:bg-fakepe-primary/5 transition group"
            >
              <Plus className="w-5 h-5 text-fakepe-primary" />
              <span className="font-medium text-fakepe-text-primary group-hover:text-fakepe-primary">Top Up</span>
            </button>
            <button
              onClick={() => setShowTransfer(true)}
              className="flex items-center justify-center gap-2 p-4 bg-fakepe-surface rounded-lg border-2 border-fakepe-border hover:border-fakepe-primary hover:bg-fakepe-primary/5 transition group"
            >
              <ArrowUpRight className="w-5 h-5 text-fakepe-primary" />
              <span className="font-medium text-fakepe-text-primary group-hover:text-fakepe-primary">Transfer</span>
            </button>
          </div>

          {/* Top-up Modal */}
          {showTopup && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-fakepe-text-primary mb-4">Top Up Wallet</h3>
                <form onSubmit={handleTopup}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-fakepe-text-primary mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(e.target.value)}
                      required
                      min="1"
                      step="0.01"
                      className="w-full px-4 py-2 bg-fakepe-background border border-fakepe-border rounded-lg focus:ring-2 focus:ring-fakepe-primary focus:border-fakepe-primary text-fakepe-text-primary"
                      placeholder="100"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowTopup(false)}
                      className="flex-1 px-4 py-2 border border-fakepe-border rounded-lg hover:bg-fakepe-background text-fakepe-text-secondary transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-fakepe-primary text-white rounded-lg hover:bg-fakepe-success transition"
                    >
                      Add Money
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Transfer Modal */}
          {showTransfer && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-fakepe-surface rounded-xl border border-fakepe-border p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-fakepe-text-primary mb-4">Transfer Money</h3>
                <form onSubmit={handleTransfer}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-fakepe-text-primary mb-2">
                      Recipient User ID
                    </label>
                    <input
                      type="text"
                      value={transferData.toUserId}
                      onChange={(e) => setTransferData({ ...transferData, toUserId: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-fakepe-background border border-fakepe-border rounded-lg focus:ring-2 focus:ring-fakepe-primary focus:border-fakepe-primary text-fakepe-text-primary"
                      placeholder="usr_..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-fakepe-text-primary mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={transferData.amount}
                      onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                      required
                      min="1"
                      step="0.01"
                      max={wallet?.balance || 0}
                      className="w-full px-4 py-2 bg-fakepe-background border border-fakepe-border rounded-lg focus:ring-2 focus:ring-fakepe-primary focus:border-fakepe-primary text-fakepe-text-primary"
                      placeholder="50"
                    />
                    <p className="text-xs text-fakepe-text-secondary mt-1">
                      Available: ₹{wallet?.balance?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowTransfer(false)}
                      className="flex-1 px-4 py-2 border border-fakepe-border rounded-lg hover:bg-fakepe-background text-fakepe-text-secondary transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-fakepe-primary text-white rounded-lg hover:bg-fakepe-success transition"
                    >
                      Send Money
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-fakepe-primary/10 border border-fakepe-primary/30 rounded-lg p-4">
            <p className="text-sm text-fakepe-text-primary">
              <strong>Sandbox Mode:</strong> This is a test wallet. Use the top-up feature to add test money.
              Share your User ID with others to receive P2P transfers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
