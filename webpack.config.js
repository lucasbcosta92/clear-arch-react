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
    extensions: ['.js', '.ts', '.tsx']
  },
}