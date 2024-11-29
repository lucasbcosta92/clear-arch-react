module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    writeToDisk: true
  },
  entry: './src/main/index.tsx',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.ts(x?)$/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'style-loader'
          }
        ],
      }
    ]
  },
  output: {
    clean: true,
    filename: 'index.js',
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.tsx', 'scss']
  },
}