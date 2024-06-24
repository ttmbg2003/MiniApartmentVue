// eslint-disable-next-line no-undef
module.exports = {
    devServer: {
      proxy: {
        '^/': {
          target: 'http://localhost:5173/',
          ws: true,
          changeOrigin: true
        },
      }
    }
  }