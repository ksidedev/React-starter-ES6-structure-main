/* eslint no-console: 0 */
const compression = require('compression');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const app = express();
const port = 3000;

const compiler = webpack(config);
compiler.apply(new DashboardPlugin());

app.use(compression());

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }

        res.set('content-type', 'text/html');
        res.send(result);
        res.end();

        return null;
    });
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
        console.info('Note: You might need to wait a few seconds for the initial webpack build to complete.');
    }
});
