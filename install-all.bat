@echo off
echo Installing dependencies for all services...

echo Installing shared dependencies...
cd shared
call npm install
cd ..

echo Installing API Gateway dependencies...
cd services\api-gateway
call npm install
cd ..\..

echo Installing Auth Service dependencies...
cd services\auth-service
call npm install
cd ..\..

echo Installing Payment Service dependencies...
cd services\payment-service
call npm install
cd ..\..

echo Installing Merchant Service dependencies...
cd services\merchant-service
call npm install
cd ..\..

echo Installing Webhook Service dependencies...
cd services\webhook-service
call npm install
cd ..\..

echo Installing Frontend dependencies...
cd frontend
call npm install
cd ..

echo All dependencies installed successfully!
pause
