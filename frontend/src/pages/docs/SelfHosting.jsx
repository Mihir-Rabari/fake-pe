import React from 'react';

export default function SelfHosting() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>Self-Hosting Guide</h1>
      
      <p className="lead">
        Complete guide to deploying and hosting your own FakePE instance for development and testing.
      </p>

      <div className="not-prose my-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r">
        <p className="text-sm text-blue-900">
          <strong>Perfect for:</strong> Development teams, testing environments, CI/CD pipelines, and demo applications.
        </p>
      </div>

      <h2 id="overview">Overview</h2>
      
      <p>Self-hosting FakePE gives you complete control over your payment gateway testing environment. You'll run:</p>
      
      <ul>
        <li><strong>Backend API</strong> - Express.js server handling payment logic</li>
        <li><strong>Frontend Dashboard</strong> - React app for merchants</li>
        <li><strong>User App</strong> - Customer-facing payment interface</li>
        <li><strong>MongoDB</strong> - Database for payment data</li>
        <li><strong>Redis</strong> - Caching and session management</li>
      </ul>

      <h2 id="prerequisites">System Requirements</h2>
      
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Requirement</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Node.js</td>
            <td>Required</td>
            <td>18.x or higher</td>
          </tr>
          <tr>
            <td>npm/yarn</td>
            <td>Required</td>
            <td>Latest</td>
          </tr>
          <tr>
            <td>Docker</td>
            <td>Required</td>
            <td>20.x or higher</td>
          </tr>
          <tr>
            <td>Docker Compose</td>
            <td>Required</td>
            <td>2.x or higher</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>Minimum</td>
            <td>4GB</td>
          </tr>
          <tr>
            <td>Disk Space</td>
            <td>Minimum</td>
            <td>2GB</td>
          </tr>
        </tbody>
      </table>

      <h2 id="installation">Step-by-Step Installation</h2>

      <h3>1. Clone Repositories</h3>
      
      <p>Clone all three repositories to your machine:</p>

      <pre><code className="language-bash">{`# Main backend and frontend
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# User app (in a separate directory)
cd ..
git clone https://github.com/Mihir-Rabari/fakePE-user-app.git`}</code></pre>

      <h3>2. Configure Environment Variables</h3>
      
      <p>Create <code>.env</code> file in the backend directory:</p>

      <pre><code className="language-bash">{`# backend/.env
NODE_ENV=production
PORT=4000

# Database
MONGO_URI=mongodb://localhost:27017/fakepe
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# CORS (optional)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Webhook Secret
WEBHOOK_SECRET=your_webhook_secret_key`}</code></pre>

      <p>Create <code>.env</code> files in frontend directories:</p>

      <pre><code className="language-bash">{`# frontend/.env
VITE_API_URL=http://localhost:4000

# fakePE-user-app/.env
VITE_API_URL=http://localhost:4000`}</code></pre>

      <h3>3. Start Infrastructure Services</h3>
      
      <p>Use Docker Compose to start MongoDB and Redis:</p>

      <pre><code className="language-bash">{`cd fake-pe
docker-compose up -d

# Verify services are running
docker-compose ps`}</code></pre>

      <p>Expected output:</p>

      <pre><code>{`NAME                SERVICE    STATUS        PORTS
mongodb            mongodb    running       0.0.0.0:27017->27017/tcp
redis              redis      running       0.0.0.0:6379->6379/tcp`}</code></pre>

      <h3>4. Install Dependencies</h3>
      
      <p>Install Node.js dependencies for all applications:</p>

      <pre><code className="language-bash">{`# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# User App
cd ../../fakePE-user-app
npm install`}</code></pre>

      <h3>5. Initialize Database</h3>
      
      <p>Run database migrations and seed data (if available):</p>

      <pre><code className="language-bash">{`cd backend
npm run db:migrate  # If migrations exist
npm run db:seed     # If seed data exists`}</code></pre>

      <h3>6. Start All Services</h3>
      
      <p>Open three terminal windows and start each service:</p>

      <p><strong>Terminal 1 - Backend:</strong></p>

      <pre><code className="language-bash">{`cd fake-pe/backend
npm run dev

# Backend running on http://localhost:4000`}</code></pre>

      <p><strong>Terminal 2 - Frontend Dashboard:</strong></p>

      <pre><code className="language-bash">{`cd fake-pe/frontend
npm run dev

# Frontend running on http://localhost:3000`}</code></pre>

      <p><strong>Terminal 3 - User App:</strong></p>

      <pre><code className="language-bash">{`cd fakePE-user-app
npm run dev

# User App running on http://localhost:3001`}</code></pre>

      <h2 id="verification">Verify Installation</h2>
      
      <p>Check that all services are running correctly:</p>

      <h3>1. Check Backend Health</h3>
      
      <pre><code className="language-bash">{`curl http://localhost:4000/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-15T10:00:00.000Z"}`}</code></pre>

      <h3>2. Test Frontend Dashboard</h3>
      
      <ul>
        <li>Open <code>http://localhost:3000</code> in your browser</li>
        <li>You should see the merchant login page</li>
        <li>Create a test account and login</li>
      </ul>

      <h3>3. Test User App</h3>
      
      <ul>
        <li>Open <code>http://localhost:3001</code> in your browser</li>
        <li>You should see the user app homepage</li>
        <li>Create a user account</li>
      </ul>

      <h3>4. Test Complete Payment Flow</h3>
      
      <p>Run this test script to verify the entire system:</p>

      <pre><code className="language-bash">{`cd fake-pe
node test-payment-flow.js`}</code></pre>

      <h2 id="production">Production Deployment</h2>

      <h3>Build for Production</h3>
      
      <pre><code className="language-bash">{`# Backend
cd backend
npm run build

# Frontend
cd ../frontend
npm run build

# User App
cd ../../fakePE-user-app
npm run build`}</code></pre>

      <h3>Using PM2 for Process Management</h3>
      
      <p>Install PM2 globally:</p>

      <pre><code className="language-bash">npm install -g pm2</code></pre>

      <p>Create PM2 ecosystem file:</p>

      <pre><code className="language-javascript">{`// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'fakepe-backend',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    },
    {
      name: 'fakepe-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run preview',
      env: {
        PORT: 3000
      }
    },
    {
      name: 'fakepe-userapp',
      cwd: '../fakePE-user-app',
      script: 'npm',
      args: 'run preview',
      env: {
        PORT: 3001
      }
    }
  ]
};`}</code></pre>

      <p>Start all services with PM2:</p>

      <pre><code className="language-bash">{`pm2 start ecosystem.config.js
pm2 save
pm2 startup`}</code></pre>

      <h3>Using Nginx as Reverse Proxy</h3>
      
      <p>Create Nginx configuration:</p>

      <pre><code className="language-nginx">{`# /etc/nginx/sites-available/fakepe
server {
    listen 80;
    server_name fakepe.example.com;

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend Dashboard
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name user.fakepe.example.com;

    # User App
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`}</code></pre>

      <p>Enable the site:</p>

      <pre><code className="language-bash">{`sudo ln -s /etc/nginx/sites-available/fakepe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx`}</code></pre>

      <h2 id="docker">Docker Deployment (All-in-One)</h2>

      <p>Deploy everything using Docker:</p>

      <pre><code className="language-yaml">{`# docker-compose.production.yml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: fakepe

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      MONGO_URI: mongodb://mongodb:27017/fakepe
      REDIS_URL: redis://redis:6379
      JWT_SECRET: \${JWT_SECRET}
    depends_on:
      - mongodb
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      VITE_API_URL: http://localhost:4000
    depends_on:
      - backend

  userapp:
    build:
      context: ../fakePE-user-app
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      VITE_API_URL: http://localhost:4000
    depends_on:
      - backend

volumes:
  mongodb_data:
  redis_data:`}</code></pre>

      <p>Start the entire stack:</p>

      <pre><code className="language-bash">{`docker-compose -f docker-compose.production.yml up -d

# View logs
docker-compose -f docker-compose.production.yml logs -f`}</code></pre>

      <h2 id="monitoring">Monitoring & Maintenance</h2>

      <h3>View Logs</h3>
      
      <pre><code className="language-bash">{`# PM2 logs
pm2 logs fakepe-backend
pm2 logs fakepe-frontend

# Docker logs
docker-compose logs -f backend
docker-compose logs -f mongodb`}</code></pre>

      <h3>Database Backup</h3>
      
      <pre><code className="language-bash">{`# Backup MongoDB
docker exec mongodb mongodump --db fakepe --out /backup

# Restore
docker exec mongodb mongorestore /backup/fakepe`}</code></pre>

      <h3>Monitor Resources</h3>
      
      <pre><code className="language-bash">{`# PM2 monitoring
pm2 monit

# Docker stats
docker stats`}</code></pre>

      <h2 id="troubleshooting">Troubleshooting</h2>

      <h3>Backend won't start</h3>
      
      <ul>
        <li>Check MongoDB is running: <code>docker-compose ps</code></li>
        <li>Verify environment variables in <code>.env</code></li>
        <li>Check logs: <code>pm2 logs fakepe-backend</code></li>
        <li>Ensure port 4000 is not in use: <code>lsof -i :4000</code></li>
      </ul>

      <h3>Database connection errors</h3>
      
      <ul>
        <li>Check MongoDB container: <code>docker logs mongodb</code></li>
        <li>Verify MONGO_URI in .env matches container</li>
        <li>Test connection: <code>mongosh mongodb://localhost:27017/fakepe</code></li>
      </ul>

      <h3>Frontend can't connect to backend</h3>
      
      <ul>
        <li>Verify VITE_API_URL in frontend <code>.env</code></li>
        <li>Check backend health endpoint: <code>curl http://localhost:4000/health</code></li>
        <li>Check CORS settings in backend</li>
        <li>Clear browser cache and reload</li>
      </ul>

      <h2 id="updates">Updating Your Instance</h2>
      
      <pre><code className="language-bash">{`# Pull latest code
git pull origin main

# Update dependencies
npm install

# Restart services
pm2 restart all

# Or with Docker
docker-compose down
docker-compose up -d --build`}</code></pre>

      <h2 id="security">Security Considerations</h2>

      <div className="not-prose my-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
        <p className="text-sm text-red-900 font-semibold mb-2">Important Security Notes</p>
        <ul className="text-sm text-red-900 space-y-1">
          <li>• Change all default secrets in production</li>
          <li>• Use strong JWT secrets (min 32 characters)</li>
          <li>• Enable HTTPS with SSL certificates</li>
          <li>• Restrict database access with authentication</li>
          <li>• Use environment variables, never hardcode secrets</li>
          <li>• Regularly update dependencies</li>
        </ul>
      </div>

      <h2>Next Steps</h2>
      
      <ul>
        <li><a href="/docs/api">Explore the API Reference</a></li>
        <li><a href="/docs/sdk">Integrate with the SDK</a></li>
        <li><a href="/docs/examples">Check out code examples</a></li>
        <li><a href="https://github.com/Mihir-Rabari/fake-pe">Star us on GitHub</a></li>
      </ul>
    </div>
  );
}
