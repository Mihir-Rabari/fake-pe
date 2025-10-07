import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Webhook, 
  Filter, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  LogOut,
  LayoutDashboard,
  Code
} from 'lucide-react';
import Logo from '../components/Logo';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import CopyButton from '../components/CopyButton';
import Toast from '../components/Toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function WebhookLogs() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedWebhook, setSelectedWebhook] = useState(null);
  const [toast, setToast] = useState(null);

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
    fetchWebhooks(token);
  }, [navigate, filter]);

  const fetchWebhooks = async (token) => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockWebhooks = [
        {
          attemptId: 'wh_attempt_1',
          paymentId: 'pay_abc123',
          callbackUrl: 'https://example.com/webhook',
          status: 'DELIVERED',
          attempts: 1,
          createdAt: new Date().toISOString(),
          deliveredAt: new Date().toISOString(),
          payload: { paymentId: 'pay_abc123', status: 'COMPLETED', amount: 1000 },
          response: { status: 200, body: { success: true } }
        },
        {
          attemptId: 'wh_attempt_2',
          paymentId: 'pay_def456',
          callbackUrl: 'https://example.com/webhook',
          status: 'FAILED',
          attempts: 3,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          lastError: 'Connection timeout',
          payload: { paymentId: 'pay_def456', status: 'COMPLETED', amount: 2000 }
        },
        {
          attemptId: 'wh_attempt_3',
          paymentId: 'pay_ghi789',
          callbackUrl: 'https://example.com/webhook',
          status: 'PENDING',
          attempts: 0,
          createdAt: new Date(Date.now() - 60000).toISOString(),
          payload: { paymentId: 'pay_ghi789', status: 'COMPLETED', amount: 1500 }
        }
      ];

      let filtered = mockWebhooks;
      if (filter) {
        filtered = mockWebhooks.filter(w => w.status === filter);
      }

      setWebhooks(filtered);
    } catch (err) {
      console.error('Failed to load webhooks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (attemptId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${API_URL}/api/v1/webhooks/${attemptId}/retry`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setToast({ type: 'success', message: 'Webhook retry initiated' });
      fetchWebhooks(token);
    } catch (err) {
      setToast({ type: 'error', message: 'Retry failed' });
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      DELIVERED: <CheckCircle className="w-5 h-5 text-green-600" />,
      FAILED: <XCircle className="w-5 h-5 text-red-600" />,
      PENDING: <Clock className="w-5 h-5 text-yellow-600" />,
      RETRY: <RefreshCw className="w-5 h-5 text-blue-600" />
    };
    return icons[status] || icons.PENDING;
  };

  const getStatusColor = (status) => {
    const colors = {
      DELIVERED: 'bg-green-100 text-green-700',
      FAILED: 'bg-red-100 text-red-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      RETRY: 'bg-blue-100 text-blue-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
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
            <Webhook className="w-5 h-5" />
            Webhooks
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
            <h1 className="text-2xl font-bold text-gray-900">Webhook Logs</h1>
            <p className="text-sm text-gray-600">Monitor webhook delivery attempts</p>
          </div>
        </header>

        <div className="p-8">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="DELIVERED">Delivered</option>
                <option value="FAILED">Failed</option>
                <option value="PENDING">Pending</option>
                <option value="RETRY">Retry</option>
              </select>
              <button
                onClick={() => fetchWebhooks(localStorage.getItem('token'))}
                className="ml-auto px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Webhook List */}
          {loading ? (
            <LoadingSkeleton type="table" />
          ) : webhooks.length === 0 ? (
            <EmptyState
              title="No webhook logs found"
              description="Webhook delivery attempts will appear here"
            />
          ) : (
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.attemptId}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(webhook.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-gray-900">{webhook.attemptId}</code>
                          <CopyButton text={webhook.attemptId} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Payment: {webhook.paymentId}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(webhook.status)}`}>
                      {webhook.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Callback URL</label>
                      <p className="text-sm text-gray-900 truncate">{webhook.callbackUrl}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Attempts</label>
                      <p className="text-sm text-gray-900">{webhook.attempts}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Created At</label>
                      <p className="text-sm text-gray-900">{new Date(webhook.createdAt).toLocaleString()}</p>
                    </div>
                    {webhook.deliveredAt && (
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Delivered At</label>
                        <p className="text-sm text-gray-900">{new Date(webhook.deliveredAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  {webhook.lastError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{webhook.lastError}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedWebhook(webhook)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                      View Payload
                    </button>
                    {webhook.status === 'FAILED' && (
                      <button
                        onClick={() => handleRetry(webhook.attemptId)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payload Modal */}
          {selectedWebhook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Webhook Details</h3>
                    <button
                      onClick={() => setSelectedWebhook(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Request Payload</h4>
                    <pre className="text-xs bg-gray-50 p-4 rounded border border-gray-200 overflow-x-auto">
                      {JSON.stringify(selectedWebhook.payload, null, 2)}
                    </pre>
                  </div>

                  {selectedWebhook.response && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Response</h4>
                      <pre className="text-xs bg-gray-50 p-4 rounded border border-gray-200 overflow-x-auto">
                        {JSON.stringify(selectedWebhook.response, null, 2)}
                      </pre>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Signature Verification</h4>
                    <p className="text-xs text-blue-700 mb-2">
                      Verify webhook signature using HMAC-SHA256:
                    </p>
                    <code className="text-xs bg-white p-2 rounded border border-blue-200 block">
                      const crypto = require('crypto');<br/>
                      const signature = crypto.createHmac('sha256', secret)<br/>
                      &nbsp;&nbsp;.update(JSON.stringify(payload))<br/>
                      &nbsp;&nbsp;.digest('hex');
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WebhookLogs;
