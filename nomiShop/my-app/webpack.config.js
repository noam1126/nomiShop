const path = require("path");

module.exports = {
  // Other configurations...
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      url: require.resolve("url/"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      fs: false,
      net: false,
      http: false,
      https: false,
    },
  },
};
