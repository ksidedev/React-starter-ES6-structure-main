const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const cssnext = require('postcss-cssnext');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const packageJSON = require('./package.json');

const dev = process.env.NODE_ENV !== 'production';

const cssLoaders = [
    'style-loader',
    {
        loader: 'css-loader',
        query: {
            modules: true,
            localIdentName: dev ? '[name]__[local]___[hash:base64:5]' : undefined,
            minimize: !dev
        }
    },
    'postcss-loader',
    'sass-loader'
];

const config = {
    entry: [
        './src/example-app/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: dev ? '/dist/' : ''
    },
    plugins: [
        new StyleLintPlugin({
            configFile: '.stylelintrc',
            context: 'src',
            files: '**/*.scss',
            failOnError: false
        }),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/example-app/index.html',
            hash: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    cssnext()
                ]
            }
        }),
        new webpack.BannerPlugin(`Spark Webpack Bundle. Version: ${packageJSON.version} Timestamp: ${(new Date()).toString()}`)
    ],
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loader: 'eslint-loader',
        //         exclude: /node_modules/
        //     }
        // ],
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: dev ? ['react-hot-loader/babel'] : []
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: dev ? cssLoaders : undefined,
                loader: dev ? undefined : ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: cssLoaders.slice(1)
                }),
                exclude: /node_modules|lib/
            },
            {
                test: /\.css$/,
                use: dev ? ['style-loader', 'css-loader'] : undefined,
                loader: dev ? undefined : ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [{
                        loader: 'css-loader',
                        query: {
                            minimize: !dev
                        }
                    }]
                }),
                include: /node_modules|lib/
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ],
                exclude: /node_modules/
            }
        ]
    }
};

if (dev) {
    config.devtool = 'inline-source-map';
    config.entry.unshift(
        'webpack-hot-middleware/client',
        'react-hot-loader/patch'
    );

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                unused: true,
                dead_code: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    );
}

module.exports = config;
