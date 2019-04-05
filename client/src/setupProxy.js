const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', {
    target: 'http://localhost:8081',
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
    ws: true
  }));
};
