#!/bin/bash

echo "🚀 Installing dependencies for all services..."

# Install shared dependencies
echo "📦 Installing shared dependencies..."
cd shared && npm install && cd ..

# Install API Gateway
echo "📦 Installing API Gateway dependencies..."
cd services/api-gateway && npm install && cd ../..

# Install Auth Service
echo "📦 Installing Auth Service dependencies..."
cd services/auth-service && npm install && cd ../..

# Install Payment Service
echo "📦 Installing Payment Service dependencies..."
cd services/payment-service && npm install && cd ../..

# Install Merchant Service
echo "📦 Installing Merchant Service dependencies..."
cd services/merchant-service && npm install && cd ../..

# Install Webhook Service
echo "📦 Installing Webhook Service dependencies..."
cd services/webhook-service && npm install && cd ../..

# Install Frontend
echo "📦 Installing Frontend dependencies..."
cd frontend && npm install && cd ..

echo "✅ All dependencies installed successfully!"
