const autoprefixer = require('autoprefixer-core')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const env = process.env.NODE_ENV
const isTest = env === 'test'

const plugins = [
  new ExtractTextPlugin('[name].css')
]

if (isTest) {
  plugins.push(new webpack.NormalModuleReplacementPlugin(/sinon/, __dirname + '/node_modules/sinon/pkg/sinon.js'))
}

const config = {
  entry: {
    'react-svg-experiment': './app/index'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {
        test: /\.sass$/,
        loader:
          'style!css!postcss!sass?indentedSyntax'
      },
      {
        test: /\.css$/,
        loader:
            'style!css!postcss'
      }
    ],
    noParse: isTest ? [
      /babel-core\/browser-polyfill\.js/,
      /acorn\/dist\/acorn\.js/,
      /sinon/
    ] : []
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: plugins,

  postcss: function () {
    return [autoprefixer]
  },

  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
}

module.exports = config
