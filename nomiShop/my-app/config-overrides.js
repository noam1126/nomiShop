const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    zlib: require.resolve("browserify-zlib"),
    querystring: require.resolve("querystring-es3"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    process: require.resolve("process/browser"),
    fs: false,
    net: false,
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ]);
  return config;
};
