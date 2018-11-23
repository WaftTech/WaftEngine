const path = require('path');
const merge = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const baseConfig = require('./webpack.base.prod.js');

const config = {
  // Tell webpack the root file of our
  // server application
  entry: './src/client/client.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',
      autoUpdate: true,

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),

    new WebpackPwaManifest({
      name: 'Grocer App',
      short_name: 'Grocer App',
      description: 'Grocer app description',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      icons: [
        {
          src: path.resolve('public/icon_512x512.png'),
          sizes: [152, 512],
        },
      ],
      fingerprints: false,
      inject: false,
    }),
  ],
};

module.exports = merge(baseConfig, config);
