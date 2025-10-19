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
      <div className="min-h-screen bg-fakepe-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-fakepe-primary animate-spin" />
      </div>
    );
  }

  if (status === 'COMPLETED') {
    return (
      <div className="min-h-screen bg-fakepe-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-fakepe-success rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-fakepe-primary rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse-slow"></div>
        
        <div className="bg-fakepe-surface rounded-xl border border-fakepe-border shadow-xl p-8 max-w-md w-full text-center relative z-10">
          <div className="w-16 h-16 bg-fakepe-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-fakepe-success" />
          </div>
          <h2 className="text-3xl font-bold text-fakepe-text-primary mb-2">Payment Successful!</h2>
          <p className="text-fakepe-text-secondary mb-6">Your payment has been processed successfully.</p>
          <div className="bg-fakepe-background rounded-lg p-4 mb-6 border border-fakepe-border">
            <div className="flex justify-between mb-2">
              <span className="text-fakepe-text-secondary">Amount</span>
              <span className="font-semibold text-fakepe-primary">₹{payment?.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fakepe-text-secondary">Payment ID</span>
              <span className="text-sm font-mono text-fakepe-text-primary">{paymentId}</span>
            </div>
          </div>
          <p className="text-sm text-fakepe-text-secondary">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div className="min-h-screen bg-fakepe-background flex items-center justify-center p-4">
        <div className="bg-fakepe-surface rounded-xl border border-fakepe-border shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-fakepe-text-primary mb-2">Payment Failed</h2>
          <p className="text-fakepe-text-secondary mb-6">{error || 'Something went wrong. Please try again.'}</p>
          <button
            onClick={() => {
              setStatus(null);
              setError('');
            }}
            className="px-6 py-3 bg-fakepe-primary text-white rounded-lg hover:bg-fakepe-success transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fakepe-background flex items-center justify-center p-4">
      <div className="bg-fakepe-surface rounded-xl border border-fakepe-border shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-fakepe-primary to-fakepe-success p-6 text-white">
          <Logo size="md" showText={true} className="mb-4" />
          <h1 className="text-2xl font-bold mb-2">Complete Payment</h1>
          <p className="text-white/80">Secure payment powered by FakePE</p>
        </div>

        {/* Payment Details */}
        <div className="p-6 border-b border-fakepe-border">
          <div className="flex justify-between items-center mb-4">
            <span className="text-fakepe-text-secondary">Amount to Pay</span>
            <span className="text-3xl font-bold text-fakepe-primary">₹{payment?.amount}</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-fakepe-text-secondary">Order ID</span>
              <span className="font-mono text-fakepe-text-primary">{payment?.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fakepe-text-secondary">Payment ID</span>
              <span className="font-mono text-fakepe-text-primary">{paymentId}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h3 className="font-semibold text-fakepe-text-primary mb-4">Select Payment Method</h3>
          
          <div className="space-y-3 mb-6">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedMethod === 'wallet' ? 'border-fakepe-primary bg-fakepe-primary/10' : 'border-fakepe-border'
            }`}>
              <input
                type="radio"
                name="method"
                value="wallet"
                checked={selectedMethod === 'wallet'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <Wallet className="w-6 h-6 text-fakepe-primary mr-3" />
              <div className="flex-1">
                <div className="font-medium text-fakepe-text-primary">FakePE Wallet</div>
                <div className="text-sm text-fakepe-text-secondary">Pay using your wallet balance</div>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedMethod === 'card' ? 'border-fakepe-primary bg-fakepe-primary/10' : 'border-fakepe-border'
            }`}>
              <input
                type="radio"
                name="method"
                value="card"
                checked={selectedMethod === 'card'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <CreditCard className="w-6 h-6 text-fakepe-primary mr-3" />
              <div className="flex-1">
                <div className="font-medium text-fakepe-text-primary">Credit/Debit Card</div>
                <div className="text-sm text-fakepe-text-secondary">Pay using card (Demo)</div>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedMethod === 'upi' ? 'border-fakepe-primary bg-fakepe-primary/10' : 'border-fakepe-border'
            }`}>
              <input
                type="radio"
                name="method"
                value="upi"
                checked={selectedMethod === 'upi'}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <Smartphone className="w-6 h-6 text-fakepe-primary mr-3" />
              <div className="flex-1">
                <div className="font-medium text-fakepe-text-primary">UPI</div>
                <div className="text-sm text-fakepe-text-secondary">Pay using UPI (Demo)</div>
              </div>
            </label>
          </div>

          {/* Payment Form */}
          {selectedMethod === 'wallet' && (
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-fakepe-text-primary mb-2">
                  Your User ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-fakepe-background border border-fakepe-border rounded-lg focus:ring-2 focus:ring-fakepe-primary focus:border-fakepe-primary text-fakepe-text-primary"
                  placeholder="usr_..."
                />
                <p className="text-xs text-fakepe-text-secondary mt-1">
                  Enter your FakePE user ID to pay from your wallet
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full px-6 py-3 bg-fakepe-primary text-white rounded-lg hover:bg-fakepe-success font-medium disabled:opacity-50 transition"
              >
                {processing ? 'Processing...' : `Pay ₹${payment?.amount}`}
              </button>
            </form>
          )}

          {selectedMethod !== 'wallet' && (
            <div className="text-center py-8 text-fakepe-text-secondary">
              <p className="mb-2">This is a demo payment method</p>
              <p className="text-sm">Please select Wallet to complete the payment</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-fakepe-background px-6 py-4 text-center text-sm text-fakepe-text-secondary border-t border-fakepe-border">
          <p>🔒 Secured by FakePE Payment Gateway</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
