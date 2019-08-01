module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
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
        "/geo": {
          target: "http://localhost:8081/geoserver",
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            "^/geo": ""
          }
        }
      }
    }
  };