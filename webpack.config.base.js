const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const srcDir = path.resolve(__dirname, 'src/main/frontend');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entries = {
    'app': path.join(srcDir, 'main.js'),
};

module.exports = {
    entry: entries,
    output: {
        publicPath: '/static/bundle/',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': srcDir
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
        new MiniCssExtractPlugin({filename: 'common.css'}),
        new VueLoaderPlugin(),
        // new HtmlWebPackPlugin({
        //     template:'./src/main/resources/index.html',
        //     filename:'../../index.html'
        // }),
        new CopyWebpackPlugin([
            {
                from: './src/main/frontend/assets',
                to: './assets'
            }
        ])
    ],
};
