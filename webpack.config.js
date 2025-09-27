import { resolve as _resolve } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

/* We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/
const config = {
  mode: 'development',
  entry: {
    server: _resolve(__dirname, 'src/server/index.ts'),
  },
  output: {
    /** "path"
     * The folder path of the output file
     */
    path: _resolve(__dirname, 'dist/server'),
    /** "filename"
     * The name of the output file
     * here [name] represents the name
     * of the chunk as determined by
     * `entry`. For example, the `server`
     * chunk will become `server.bundle.js`
     */
    filename: '[name].bundle.js',
    /** "chunkFormat"
     * Lets webpack know to output the chunks
     * as es modules. This is only possible
     * because we have set `experiments.outputModule`
     * to true
     */
    chunkFormat: 'module',
  },
  experiments: {
    /** "outputModule"
     * As es modules are still experimental
     * in webpack we need to explicitly tell
     * the compiler that we want this feature
     */
    outputModule: true,
  },
  /** "target"
   * In this case we want to target
   * the node environment, as we are
   * not going to use this in the browser
   */
  target: 'node',
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  externals: ['express'],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
};

export default config;
