module.exports = {
    devServer: {
      host: "localhost",
      port: 8080,
      proxy: {
        "/api": {
          target: "http://localhost:3000/",
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            "^/api": ""
          }
        },
        "/download": {
          target: "http://localhost:8081/",
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            "^/download": ""
          }
        }
      }
    }
  };