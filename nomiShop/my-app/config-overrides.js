const webpack = require("webpack");
const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
} = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    process: "process/browser",
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  ),
  (config) => {
    config.resolve.fallback = {
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      process: require.resolve("process/browser"),
      vm: require.resolve("vm-browserify"),
      fs: false,
      net: false,
    };
    return config;
  }
);
