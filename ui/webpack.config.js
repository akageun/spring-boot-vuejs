const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const developmentConfig = require('./webpack.config.local');
const productionConfig = require('./webpack.config.prod');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const srcdir = path.resolve(__dirname, 'src');

const entries = {
    'app': path.join(srcdir, 'main.js'),
};

const commonConfig = {
    entry: entries,
    output: {
        publicPath: '/static/bundle/',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': srcdir
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },

            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};

module.exports = (env) => env === 'development'
    ? webpackMerge(commonConfig, developmentConfig)
    : webpackMerge(commonConfig, productionConfig);
