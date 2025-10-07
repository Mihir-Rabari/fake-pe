@echo off
echo Starting Expe Payment Gateway...

echo Stopping existing containers...
docker-compose down

echo Building and starting all services...
docker-compose up --build -d

echo Waiting for services to be ready...
timeout /t 10 /nobreak

echo Service Status:
docker-compose ps

echo.
echo All services started!
echo.
echo Access Points:
echo    Frontend:    http://localhost:3000
echo    API Gateway: http://localhost:4000
echo    Grafana:     http://localhost:3001 (admin/expe_grafana_2024)
echo    Prometheus:  http://localhost:9090
echo.
echo View logs: docker-compose logs -f [service-name]
echo Stop all:  docker-compose down
pause
