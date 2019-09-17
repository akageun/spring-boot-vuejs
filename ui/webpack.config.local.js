const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = '/static/';

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        index: path.resolve(__dirname, '.index.html'),
        historyApiFallback: true,
        disableHostCheck: true,
        compress: true,
        contentBase: outputPath,
        publicPath: "/static/bundle",
        host: "0.0.0.0",
        port: 3000,
        proxy: {
            "**": "http://localhost:8080"
        }
    },

    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
    ],
};
