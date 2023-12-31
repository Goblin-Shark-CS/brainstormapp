const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/index.js', // First entry point
    login: './src/createRoom.js', // Second entry point
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web',
  devServer: {
    host: '0.0.0.0',
    // port: 8080 by default
    open: false, // stops the browser from opening every time server is started
    proxy: {
      '/api': 'http://localhost:3000',
      '/start': 'http://localhost:3000',
      '/join': 'http://localhost:3000',
      '/view': 'http://localhost:3000',
      '/assets': 'http://localhost:3000',
      // need to list for every endpoint used
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // order reads right to left (turns sass files to css to style string)
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'app.html',
      template: path.join(__dirname, 'public', 'app.html'),
      chunks: ['app'], // Includes only app code
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'index.html',
      publicPath: '/',
      template: path.join(__dirname, 'public', 'index.html'),
      chunks: ['login'], // Includes only login React code
    }),
  ],
};
