const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devServer: {
    proxy: {
      '/xkcd': {
        target: 'https://xkcd.com',
        changeOrigin: true,
        pathRewrite: {
          '^/xkcd': '', // Rimuovi il prefisso /xkcd dalle richieste
        },
      },
    },
  },
};
