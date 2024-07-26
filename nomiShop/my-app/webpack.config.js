const path = require("path");

module.exports = {
  // Your other webpack configuration options
  resolve: {
    fallback: {
      vm: require.resolve("vm-browserify"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      querystring: require.resolve("querystring-es3"),
      fs: false, // Not available in browser
      net: false, // Not available in browser
      http: require.resolve("stream-http"),
    },
  },
};
