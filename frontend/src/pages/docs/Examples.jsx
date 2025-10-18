import React from 'react';
import DocPage from '../../components/docs/DocPage';
import CodeBlock from '../../components/docs/CodeBlock-new';
import Callout from '../../components/docs/Callout';

export default function Examples() {
  return (
    <DocPage
      title="Code Examples"
      description="Real-world integration examples for different use cases and frameworks."
    >

      <h2>Table of Contents</h2>
      
      <ul>
        <li><a href="#express">Express.js Backend</a></li>
        <li><a href="#react">React Frontend</a></li>
        <li><a href="#nextjs">Next.js Full Stack</a></li>
        <li><a href="#django">Django/Python</a></li>
        <li><a href="#php">PHP/Laravel</a></li>
        <li><a href="#mobile">React Native Mobile</a></li>
      </ul>

      <h2 id="express">Express.js Backend Example</h2>

      <h3>Complete E-commerce Integration</h3>
      
      <CodeBlock
        language="javascript"
        code={`// server.js
const express = require('express');
const FakePE = require('fakepe-sdk');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize FakePE
const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET
});

// In-memory order storage (use database in production)
const orders = new Map();

// Create order and payment
app.post('/api/orders', async (req, res) => {
  try {
    const { items, customerEmail, customerName } = req.body;

    // Calculate total
    const total = items.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );

    // Generate order ID
    const orderId = 'order_' + Date.now();

    // Create payment
    const payment = await fakepe.payments.create({
      merchantId: process.env.MERCHANT_ID,
      amount: total * 100, // Convert to paise
      orderId,
      callbackUrl: \`\${process.env.BASE_URL}/webhook\`,
      metadata: {
        customerEmail,
        customerName,
        items: JSON.stringify(items)
      }
    });

    // Store order
    orders.set(orderId, {
      id: orderId,
      items,
      total,
      customerEmail,
      customerName,
      status: 'PENDING',
      paymentId: payment.paymentId,
      createdAt: new Date()
    });

    res.json({
      orderId,
      paymentId: payment.paymentId,
      paymentUrl: payment.paymentUrl,
      amount: total
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check order status
app.get('/api/orders/:orderId', async (req, res) => {
  const order = orders.get(req.params.orderId);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Fetch latest payment status
  try {
    const payment = await fakepe.payments.fetch(order.paymentId);
    order.paymentStatus = payment.status;
  } catch (error) {
    console.error('Error fetching payment:', error);
  }

  res.json(order);
});

// Webhook handler
app.post('/webhook', async (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  
  // Verify signature
  if (!fakepe.webhooks.verify(req.body, signature)) {
    return res.status(400).send('Invalid signature');
  }

  const { event, data } = req.body;
  console.log('Webhook received:', event, data.paymentId);

  const order = orders.get(data.orderId);
  if (!order) {
    return res.status(404).send('Order not found');
  }

  switch (event) {
    case 'payment.completed':
      order.status = 'PAID';
      order.paidAt = new Date();
      
      // Send confirmation email
      await sendConfirmationEmail(order);
      
      console.log(\`Order \${order.id} paid successfully\`);
      break;

    case 'payment.failed':
      order.status = 'FAILED';
      order.failedAt = new Date();
      
      console.log(\`Payment failed for order \${order.id}\`);
      break;

    case 'payment.refunded':
      order.status = 'REFUNDED';
      order.refundedAt = new Date();
      
      console.log(\`Order \${order.id} refunded\`);
      break;
  }

  orders.set(order.id, order);
  res.status(200).send('OK');
});

// Refund endpoint
app.post('/api/orders/:orderId/refund', async (req, res) => {
  try {
    const order = orders.get(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status !== 'PAID') {
      return res.status(400).json({ error: 'Order not paid yet' });
    }

    const { amount, reason } = req.body;

    const refund = await fakepe.payments.refund(order.paymentId, {
      amount: amount ? amount * 100 : undefined, // Partial or full
      reason: reason || 'Customer request'
    });

    order.status = 'REFUNDED';
    order.refundId = refund.refundId;
    orders.set(order.id, order);

    res.json({ success: true, refund });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function
async function sendConfirmationEmail(order) {
  // Implement email sending logic
  console.log(\`Sending confirmation to \${order.customerEmail}\`);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
      />

      <h2 id="react">React Frontend Example</h2>

      <h3>Checkout Component</h3>
      
      <CodeBlock
        language="jsx"
        code={`// components/Checkout.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Checkout({ cart, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: ''
  });

  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create order on backend
      const response = await axios.post('/api/orders', {
        items: cart,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email
      });

      const { paymentUrl, orderId } = response.data;

      // Redirect to payment page
      window.location.href = paymentUrl;

      // OR open in modal
      // openPaymentModal(paymentUrl);

      // OR display QR code
      // showQRCode(response.data.qrData);

    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between py-2">
            <span>{item.name} x{item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : \`Pay ₹\${total}\`}
        </button>
      </form>
    </div>
  );
}`}
      />

      <h3>Order Status Component</h3>
      
      <CodeBlock
        language="jsx"
        code={`// components/OrderStatus.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function OrderStatus() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderStatus();
    
    // Poll every 3 seconds
    const interval = setInterval(fetchOrderStatus, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(\`/api/orders/\${orderId}\`);
      setOrder(response.data);
      
      // Stop polling if payment complete
      if (response.data.status === 'PAID') {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !order) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Order Status</h2>

      <div className="mb-4">
        <p className="text-gray-600">Order ID</p>
        <p className="font-mono">{order.id}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">Status</p>
        <StatusBadge status={order.status} />
      </div>

      <div className="mb-4">
        <p className="text-gray-600">Amount</p>
        <p className="text-2xl font-bold">₹{order.total}</p>
      </div>

      {order.status === 'PENDING' && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-800">
            Waiting for payment confirmation...
          </p>
        </div>
      )}

      {order.status === 'PAID' && (
        <div className="p-4 bg-green-50 border-l-4 border-green-400">
          <p className="text-sm text-green-800">
            Payment successful! Thank you for your order.
          </p>
        </div>
      )}

      {order.status === 'FAILED' && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <p className="text-sm text-red-800">
            Payment failed. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PAID: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    REFUNDED: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={\`px-3 py-1 rounded-full text-sm font-semibold \${colors[status]}\`}>
      {status}
    </span>
  );
}`}
      />

      <h2 id="nextjs">Next.js Full Stack Example</h2>

      <h3>API Route Handler</h3>
      
      <CodeBlock
        language="javascript"
        code={`// pages/api/checkout.js
import FakePE from 'fakepe-sdk';

const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, orderId, metadata } = req.body;

    const payment = await fakepe.payments.create({
      merchantId: process.env.MERCHANT_ID,
      amount,
      orderId,
      callbackUrl: \`\${process.env.NEXT_PUBLIC_URL}/api/webhook\`,
      metadata
    });

    res.status(200).json({
      paymentId: payment.paymentId,
      paymentUrl: payment.paymentUrl
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message });
  }
}`}
      />

      <h3>Server Component</h3>
      
      <CodeBlock
        language="jsx"
        code={`// app/checkout/page.jsx
'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 50000,
          orderId: 'order_' + Date.now(),
          metadata: {
            product: 'Premium Plan'
          }
        })
      });

      const data = await response.json();
      
      // Redirect to payment
      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}`}
      />

      <h2 id="django">Django/Python Example</h2>

      <CodeBlock
        language="python"
        code={`# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import requests
from requests.auth import HTTPBasicAuth
import os
import json

FAKEPE_API = 'https://api.fakepe.example.com/api/v1'
KEY_ID = os.environ.get('FAKEPE_KEY_ID')
KEY_SECRET = os.environ.get('FAKEPE_KEY_SECRET')

@require_http_methods(["POST"])
@csrf_exempt
def create_payment(request):
    try:
        data = json.loads(request.body)
        
        # Create payment
        response = requests.post(
            f'{FAKEPE_API}/payments',
            json={
                'merchantId': os.environ.get('MERCHANT_ID'),
                'amount': data['amount'],
                'orderId': data['orderId'],
                'callbackUrl': f"{os.environ.get('BASE_URL')}/webhook"
            },
            auth=HTTPBasicAuth(KEY_ID, KEY_SECRET)
        )
        
        payment = response.json()
        
        return JsonResponse({
            'paymentId': payment['paymentId'],
            'paymentUrl': payment['paymentUrl']
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def webhook(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    # Verify signature
    signature = request.headers.get('X-Fakepe-Signature')
    # Implement signature verification
    
    data = json.loads(request.body)
    event = data.get('event')
    payment_data = data.get('data')
    
    if event == 'payment.completed':
        # Handle successful payment
        print(f"Payment {payment_data['paymentId']} completed")
        # Update your database, send email, etc.
        
    elif event == 'payment.failed':
        # Handle failed payment
        print(f"Payment {payment_data['paymentId']} failed")
    
    return JsonResponse({'status': 'ok'})

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('create-payment/', views.create_payment),
    path('webhook/', views.webhook),
]`}
      />

      <h2 id="php">PHP/Laravel Example</h2>

      <CodeBlock
        language="php"
        code={`<?php
// app/Http/Controllers/PaymentController.php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Http;

class PaymentController extends Controller
{
    private $apiUrl = 'https://api.fakepe.example.com/api/v1';
    
    public function createPayment(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'order_id' => 'required|string'
        ]);

        $response = Http::withBasicAuth(
            env('FAKEPE_KEY_ID'),
            env('FAKEPE_KEY_SECRET')
        )->post($this->apiUrl . '/payments', [
            'merchantId' => env('MERCHANT_ID'),
            'amount' => $validated['amount'],
            'orderId' => $validated['order_id'],
            'callbackUrl' => route('payment.webhook')
        ]);

        if ($response->successful()) {
            $payment = $response->json();
            
            return response()->json([
                'paymentId' => $payment['paymentId'],
                'paymentUrl' => $payment['paymentUrl']
            ]);
        }

        return response()->json([
            'error' => 'Payment creation failed'
        ], 500);
    }

    public function webhook(Request $request)
    {
        // Verify signature
        $signature = $request->header('X-Fakepe-Signature');
        // Implement signature verification

        $event = $request->input('event');
        $data = $request->input('data');

        switch ($event) {
            case 'payment.completed':
                // Handle successful payment
                \\Log::info('Payment completed', ['paymentId' => $data['paymentId']]);
                break;
                
            case 'payment.failed':
                // Handle failed payment
                \\Log::error('Payment failed', ['paymentId' => $data['paymentId']]);
                break;
        }

        return response()->json(['status' => 'ok']);
    }
}

// routes/web.php
Route::post('/create-payment', [PaymentController::class, 'createPayment']);
Route::post('/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');`}
      />

      <h2 id="mobile">React Native Mobile Example</h2>

      <CodeBlock
        language="jsx"
        code={`// screens/CheckoutScreen.jsx
import React, { useState } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import axios from 'axios';

export default function CheckoutScreen({ route }) {
  const { cartTotal } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await axios.post('https://yourapi.com/create-payment', {
        amount: cartTotal * 100,
        orderId: 'order_' + Date.now()
      });

      const { paymentUrl } = response.data;

      // Open payment URL in browser
      const supported = await Linking.canOpenURL(paymentUrl);
      if (supported) {
        await Linking.openURL(paymentUrl);
      } else {
        console.error('Cannot open URL:', paymentUrl);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Checkout</Text>
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Total: ₹{cartTotal}
      </Text>
      <Button
        title={loading ? 'Processing...' : 'Pay Now'}
        onPress={handlePayment}
        disabled={loading}
      />
    </View>
  );
}`}
      />

      <h2>Download Complete Examples</h2>
      
      <p>Find complete, runnable examples in our GitHub repositories:</p>

      <ul>
        <li><a href="https://github.com/Mihir-Rabari/fake-pe/tree/main/examples">Main Repository Examples</a></li>
        <li><a href="https://github.com/Mihir-Rabari/fakePE-sdk/tree/main/examples">SDK Examples</a></li>
      </ul>
    </DocPage>
  );
}
