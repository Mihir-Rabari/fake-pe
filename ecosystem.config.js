module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: './backend',
      script: 'src/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'development',
        PORT: 4000
      }
    }
  ]
};
