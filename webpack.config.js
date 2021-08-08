const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: './bundle.js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.ts', '.js'],
    modules: ['node_modules', 'src'],
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.template\.html$/,
        loader: 'file-loader',
        options: {
          configFile: 'src/tsconfig.app.json',
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  devServer: {
    contentBase: 'dist',
    open: true,
    port: 8080,
    index: 'index.html',
  },
  devtool: 'source-map',
};
