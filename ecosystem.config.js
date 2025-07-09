

module.exports = {

  apps: [
      {
          name: 'main',
          script: 'dist/main.js',
          env: {
              NODE_ENV: 'development',
              PORT:7001
          },
          env_production: {
              NODE_ENV: 'production',
              PORT: 7001,
          },
      },
  ],
};
