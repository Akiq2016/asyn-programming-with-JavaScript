const path              = require('path')
const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const generateHtml = new HtmlWebpackPlugin({
  filename: 'dist/index.html',
  template: path.resolve(__dirname, './index.html'),
  inject: true
})

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/app-cb.js')
    // main: path.resolve(__dirname, './src/app-p.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [ generateHtml ],
  resolve: {
    modules: [ path.resolve(__dirname, "src"), "node_modules" ],
    extensions: ['.js']
  },
  devtool: 'cheap-eval-source-map'
}