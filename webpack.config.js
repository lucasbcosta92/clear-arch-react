const path = require('path')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    devMiddleware: {
      writeToDisk: true
    },
    historyApiFallback: true,
    open: true,
    port: 3000
  },
  entry: './src/main/index.tsx',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'index.js'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': 'http://fordevs.herokuapp.com/api'
    })
  ]
}
