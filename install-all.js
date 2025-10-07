const { execSync } = require('child_process');
const path = require('path');

const services = [
  'shared',
  'services/api-gateway',
  'services/auth-service',
  'services/payment-service',
  'services/merchant-service',
  'services/webhook-service',
  'frontend'
];

console.log('🚀 Installing dependencies for all services...\n');

services.forEach((service) => {
  console.log(`📦 Installing ${service}...`);
  try {
    execSync('npm install', {
      cwd: path.join(__dirname, service),
      stdio: 'inherit'
    });
    console.log(`✅ ${service} installed\n`);
  } catch (error) {
    console.error(`❌ Failed to install ${service}`);
    process.exit(1);
  }
});

console.log('✅ All dependencies installed successfully!');
