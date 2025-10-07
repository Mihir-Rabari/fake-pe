module.exports = {
  apps: [
    {
      name: 'api-gateway',
      cwd: './services/api-gateway',
      script: 'src/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'development',
        PORT: 4000
      }
    },
    {
      name: 'auth-service',
      cwd: './services/auth-service',
      script: 'src/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'development',
        PORT: 4001
      }
    },
    {
      name: 'payment-service',
      cwd: './services/payment-service',
      script: 'src/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'development',
        PORT: 4002
      }
    },
    {
      name: 'merchant-service',
      cwd: './services/merchant-service',
      script: 'src/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'development',
        PORT: 4003
      }
    },
    {
      name: 'webhook-service',
      cwd: './services/webhook-service',
      script: 'src/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run dev',
      watch: false,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};
