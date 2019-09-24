const path = require('path');

const baseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestReplacePlugin = require('webpack-manifest-replace-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    output: {
        filename: '[name]-[chunkhash].js',
        path: path.resolve(__dirname, 'target/prepare/WEB-INF/classes/static/bundle'),
    },
    optimization: {
        minimizer: [
            new OptimizeCssnanoPlugin({
                sourceMap: false,
                cssnanoOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true,
                            },
                        },
                    ],
                },
            }),
        ],
    },
    performance: {
        maxAssetSize: 100000
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'base-[contenthash].css'}),
        new ManifestReplacePlugin({
            include: path.resolve(__dirname, 'src/main/resources/templates'),
            test: /\.(jsp|html|htm)$/,
            outputDir: path.resolve(__dirname, 'target/prepare/WEB-INF/classes/templates'),
        }),
    ],
});
