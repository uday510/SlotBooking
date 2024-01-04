const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://slot-booking-backend-roan.vercel.app',
      changeOrigin: true,
    })
  );
};