const path = require('path');
const webpack = require('webpack');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { ifProduction } = getIfUtils(process.env.NODE_ENV);

module.exports = {
  mode: ifProduction('production', 'development'),
  entry: './react-frontend/src/index.js',
  output: {
    filename: 'main.js',
    path: ifProduction(
      path.resolve(__dirname, 'build', 'static'),
      path.resolve(__dirname, 'build')
    ),
    publicPath: ifProduction('static/', '/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: removeEmpty([
          ifProduction(MiniCssExtractPlugin.loader, 'style-loader'),
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: removeEmpty([
    ifProduction(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      })
    ),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: ifProduction('../index.html', 'index.html'),
      template: path.resolve(
        __dirname,
        'react-frontend',
        'public',
        'index.html'
      ),
    }),
    ifProduction(
      new MiniCssExtractPlugin({
        filename: '[name].css',
      })
    ),
  ]),
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    stats: 'minimal',
  },
};
