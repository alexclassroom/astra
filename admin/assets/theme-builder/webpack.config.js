const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const WebpackRTLPlugin = require('webpack-rtl-plugin');

module.exports = {
  ...defaultConfig,
  entry: {
    'index': path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    // ...defaultConfig.plugins
    ...defaultConfig.plugins.filter(function (plugin) {
      if (plugin.constructor.name === 'LiveReloadPlugin') {
        return false;
      }
      return true;
    }),
    new WebpackRTLPlugin({
      // Specify the source CSS file to create RTL CSS from.
      // You should replace 'your-source.css' with the actual CSS file path.
      source: path.resolve(__dirname, 'src/style/main.css'),

      // Specify the output directory and filename for the RTL CSS.
      // Adjust the path and filename as needed.
      // For example, you can name it 'your-source-rtl.css'.
      target: path.resolve(__dirname, 'build/index-rtl.css'),
    }),
  ],
};
