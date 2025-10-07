#!/bin/bash

echo "🚀 Starting Expe Payment Gateway..."

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start all services
echo "🔨 Building and starting all services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 10

# Show status
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ All services started!"
echo ""
echo "🌐 Access Points:"
echo "   Frontend:    http://localhost:3000"
echo "   API Gateway: http://localhost:4000"
echo "   Grafana:     http://localhost:3001 (admin/expe_grafana_2024)"
echo "   Prometheus:  http://localhost:9090"
echo ""
echo "📝 View logs: docker-compose logs -f [service-name]"
echo "🛑 Stop all:  docker-compose down"
