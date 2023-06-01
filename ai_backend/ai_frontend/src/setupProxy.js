const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/generateimage',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/generateAiImage',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Replace with the appropriate backend server URL
      changeOrigin: true,
    })
  );
   app.use(
    '/upload',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Replace with the appropriate backend server URL
      changeOrigin: true,
    })
  );

};