#!/usr/bin/env node

/**
 * This script extends the default Webpack config from
 * `create-react-app` and modify it accordingly, so that
 * any changes in our source files are emitted and automatically
 * detected by `webpack-extension-reloader`, which then automatically
 * tells Google Chrome to update our extension.
 *
 * Thanks to Mazzarolo Matteo:
 * https://mmazzarolo.com/blog/2019-10-19-browser-extension-development/
 */

// Force a "development" environment.
const DEV = 'development';
process.env.BABEL_ENV = DEV;
process.env.NODE_ENV = DEV;

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const configFactory = require('react-scripts/config/webpack.config');
const colors = require('colors/safe');
const ExtensionReloader = require('webpack-extension-reloader');

// Extend the default Webpack config used by CRA.
const config = configFactory(DEV);

// The classic webpack-dev-server can't be used to develop browser extensions,
// so we remove the "webpackHotDevClient" from the config "entry" point.
config.entry = config.entry.filter(entry => (
  !entry.includes('webpackHotDevClient')
));

// Edit the Webpack config by setting the output directory to "./build".
config.output.path = paths.appBuild;
paths.publicUrl = paths.appBuild + '/';

// Remove the chunk hash from the file names. This way we can press "Reload frame"
// in our DevTools to reload our inner app frame.
config.output.filename = '[name].bundle.js';

// Add the webpack-extension-reloader plugin to the Webpack config.
// It notifies and reloads the extension on code changes.
config.plugins.push(new ExtensionReloader());

// Start Webpack in watch mode.
const compiler = webpack(config);
const watcher = compiler.watch({}, function(err) {
  if (err) {
    console.error(err);
  } else {
    // Every time Webpack finishes recompiling copy all the assets of the
    // "public" dir in the "build" dir (except for the index.html)
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: file => file !== paths.appHtml
    });

    // Report on console the succesfull build
    console.clear();
    console.info(colors.green('Compiled successfully!'));
    console.info('Built at', new Date().toLocaleTimeString());
    console.info();
    console.info('Note that the development build is not optimized.');
    console.info('To create a production build, use yarn build.');
  }
});
