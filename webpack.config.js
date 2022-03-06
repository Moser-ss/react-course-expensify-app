const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

if (process.env.NODE_ENV === ' test') {
  require('dotenv').config({ path: '.env.test'})
} else if (process.env.NODE_ENV === 'dev' ) {
  require('dotenv').config({ path: '.env.dev'})
}
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: [ '@babel/polyfill' , './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader","sass-loader"],
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN':JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL':JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID':JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),

      })
    ],
    devtool:isProduction? 'source-map' :'inline-source-map',
    devServer: {
      static:{
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      devMiddleware:{
        publicPath: '/dist/',
      }
    }
  }
}
