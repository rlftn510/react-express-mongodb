const { createProxyMiddleware } = require("http-proxy-middleware");
console.log("ee");
module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
