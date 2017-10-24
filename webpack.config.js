const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: ['./src/js/index.js', './src/style/style.scss'],
    vendor: ['./lib/lib1.js', './lib/lib2.js'],
  },
  output: {
    path: path.join(__dirname, '/target/'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('common.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minSize: 1
    }),
    new BundleAnalyzerPlugin()
  ],
};
