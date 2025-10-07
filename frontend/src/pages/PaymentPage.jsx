import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, Smartphone, CheckCircle, XCircle, Loader } from 'lucide-react';
import Logo from '../components/Logo';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function PaymentPage() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPayment();
  }, [paymentId]);

  const fetchPayment = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/payments/${paymentId}`);
      setPayment(response.data.payment);
      
      if (response.data.payment.status !== 'CREATED') {
        setStatus(response.data.payment.status);
      }
    } catch (err) {
      setError('Payment not found');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/payments/${paymentId}/complete`,
        {
          payer: userId,
          method: selectedMethod
        }
      );

      setStatus('COMPLETED');
      setTimeout(() => {
        if (payment.callbackUrl) {
          window.location.href = payment.callbackUrl;
        }
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
      setStatus('FAILED');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (status === 'COMPLETED') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold">₹{payment?.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID</span>
              <span className="text-sm font-mono">{paymentId}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">{error || 'Something went wrong. Please try again.'}</p>
          <button
            onClick={() => {
              setStatus(null);
              setError('');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <Logo size="md" className="mb-4" />
          <h1 className="text-2xl font-bold mb-2">Complete Payment</h1>
          <p className="text-blue-100">Secure payment powered by Expe</p>
        </div>

        {/* Payment Details */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Amount to Pay</span>
            <span className="text-3xl font-bold text-gray-900">₹{payment?.amount}</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-mono">{payment?.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-mono">{paymentId}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Select Payment Method</h3>
          
          <div className="space-y-3 mb-6">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedMethod === 'wallet' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                name="method"
                value="wallet"
                checked={selectedMethod === 'wallet'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <Wallet className="w-6 h-6 text-blue-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium">Expe Wallet</div>
                <div className="text-sm text-gray-600">Pay using your wallet balance</div>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                name="method"
                value="card"
                checked={selectedMethod === 'card'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium">Credit/Debit Card</div>
                <div className="text-sm text-gray-600">Pay using card (Demo)</div>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                name="method"
                value="upi"
                checked={selectedMethod === 'upi'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <Smartphone className="w-6 h-6 text-blue-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium">UPI</div>
                <div className="text-sm text-gray-600">Pay using UPI (Demo)</div>
              </div>
            </label>
          </div>

          {/* Payment Form */}
          {selectedMethod === 'wallet' && (
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your User ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="usr_..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your Expe user ID to pay from your wallet
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
              >
                {processing ? 'Processing...' : `Pay ₹${payment?.amount}`}
              </button>
            </form>
          )}

          {selectedMethod !== 'wallet' && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">This is a demo payment method</p>
              <p className="text-sm">Please select Wallet to complete the payment</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
          <p>🔒 Secured by Expe Payment Gateway</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
