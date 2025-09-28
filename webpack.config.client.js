import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = new URL('.', import.meta.url).pathname;

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/
const config = {
  mode: 'development',
  entry: _resolve(__dirname, 'client/index.tsx'),
  output: {
    /**
     * "path"
     * the folder path of the output file
     */
    path: _resolve(__dirname, 'dist/client/public'),
    publicPath: '/public/',

    /**
     * "filename"
     * the name of the output file
     */
    filename: 'client.bundle.js',
  },

  /**
   * "target"
   * because we want the output to be
   * able to run on a browser, we need
   * set the target to `web`
   */
  target: 'web',
  resolve: {
    /**
     * "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default config;
