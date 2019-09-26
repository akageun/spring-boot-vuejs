const path = require('path');

const baseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = '/static/';

module.exports = webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        index: path.resolve(__dirname, './index.html'),
        historyApiFallback: true,
        disableHostCheck: true,
        compress: true,
        contentBase: outputPath,
        publicPath: "/static/bundle",
        host: "0.0.0.0",
        port: 3000,
        proxy: {
            "**": "http://localhost:9908"
        }
    },

    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
    ],
});
