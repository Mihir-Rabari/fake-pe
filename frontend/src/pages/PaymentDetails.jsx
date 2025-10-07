import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  XCircle,
  RefreshCw,
  Download
} from 'lucide-react';
import Logo from '../components/Logo';
import CopyButton from '../components/CopyButton';
import LoadingSkeleton from '../components/LoadingSkeleton';
import axios from 'axios';
import QRCode from 'qrcode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function PaymentDetails() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [webhooks, setWebhooks] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [refunding, setRefunding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchPaymentDetails(token);
  }, [paymentId, navigate]);

  const fetchPaymentDetails = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPayment(response.data.payment);

      // Generate QR code
      const paymentUrl = `${window.location.origin}/pay/${paymentId}`;
      const qr = await QRCode.toDataURL(paymentUrl);
      setQrCode(qr);

      // Fetch webhook attempts (if endpoint exists)
      try {
        const webhookResponse = await axios.get(
          `${API_URL}/api/v1/payments/${paymentId}/webhooks`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWebhooks(webhookResponse.data.webhooks || []);
      } catch (err) {
        console.log('Webhook endpoint not available');
      }
    } catch (err) {
      console.error('Failed to load payment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!confirm('Are you sure you want to refund this payment?')) return;

    setRefunding(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${API_URL}/api/v1/payments/${paymentId}/refund`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Refund initiated successfully');
      fetchPaymentDetails(token);
    } catch (err) {
      alert(err.response?.data?.error || 'Refund failed');
    } finally {
      setRefunding(false);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      CREATED: <Clock className="w-5 h-5 text-gray-500" />,
      PENDING: <RefreshCw className="w-5 h-5 text-yellow-500" />,
      COMPLETED: <CheckCircle className="w-5 h-5 text-green-500" />,
      FAILED: <XCircle className="w-5 h-5 text-red-500" />,
      REFUNDED: <RefreshCw className="w-5 h-5 text-blue-500" />
    };
    return icons[status] || icons.CREATED;
  };

  const getStatusColor = (status) => {
    const colors = {
      CREATED: 'bg-gray-100 text-gray-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      COMPLETED: 'bg-green-100 text-green-700',
      FAILED: 'bg-red-100 text-red-700',
      REFUNDED: 'bg-blue-100 text-blue-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <LoadingSkeleton type="card" count={3} />
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment not found</h2>
          <Link to="/transactions" className="text-blue-600 hover:text-blue-700">
            Back to transactions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/transactions"
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
                <p className="text-sm text-gray-600">View complete payment information</p>
              </div>
            </div>
            <Logo size="md" />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Info Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Payment ID</label>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-gray-900">{payment.paymentId}</code>
                    <CopyButton text={payment.paymentId} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Order ID</label>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-gray-900">{payment.orderId}</code>
                    <CopyButton text={payment.orderId} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                  <p className="text-2xl font-bold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
                  <p className="text-sm text-gray-900">{payment.currency || 'INR'}</p>
                </div>

                {payment.method && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
                    <p className="text-sm text-gray-900 capitalize">{payment.method}</p>
                  </div>
                )}

                {payment.payer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Payer</label>
                    <p className="text-sm text-gray-900">{payment.payer}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Created At</label>
                  <p className="text-sm text-gray-900">{new Date(payment.createdAt).toLocaleString()}</p>
                </div>

                {payment.completedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Completed At</label>
                    <p className="text-sm text-gray-900">{new Date(payment.completedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>

              {payment.metadata && Object.keys(payment.metadata).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Metadata</label>
                  <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto">
                    {JSON.stringify(payment.metadata, null, 2)}
                  </pre>
                </div>
              )}

              {/* Refund Button */}
              {payment.status === 'COMPLETED' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleRefund}
                    disabled={refunding}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {refunding ? 'Processing...' : 'Refund Payment'}
                  </button>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon('CREATED')}
                    <div className="w-px h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-gray-900">Payment Created</p>
                    <p className="text-sm text-gray-600">{new Date(payment.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {payment.completedAt && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(payment.status)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Payment {payment.status}</p>
                      <p className="text-sm text-gray-600">{new Date(payment.completedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Webhook Delivery Status */}
            {webhooks.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Webhook Delivery</h2>
                <div className="space-y-3">
                  {webhooks.map((webhook, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Attempt #{webhook.attempts || 1}</p>
                        <p className="text-xs text-gray-600">{webhook.callbackUrl}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        webhook.status === 'DELIVERED' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {webhook.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            {qrCode && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment QR Code</h3>
                <div className="flex justify-center mb-4">
                  <img src={qrCode} alt="Payment QR Code" className="w-48 h-48" />
                </div>
                <a
                  href={qrCode}
                  download={`payment-${paymentId}.png`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </a>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  View in Dashboard
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Resend Webhook
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Export Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
