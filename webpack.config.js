const path = require('path');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: isProd ? [/node_modules\/amazon-kinesis-video-streams-webrtc/] : [],
      },
    ],
  },
  plugins: [
    new MonacoEditorWebpackPlugin({
      languages: ['javascript', 'typescript', 'python', 'java', 'csharp', 'php', 'go'],
    }),
  ],
  resolve: {
    fallback: {
      fs: false, // Add only if there are fs issues
    },
  },
};
