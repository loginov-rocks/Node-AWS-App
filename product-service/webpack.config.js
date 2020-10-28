module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },
  target: 'node',
};
