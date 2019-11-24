var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const {VueLoaderPlugin} = require('vue-loader');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
    context: __dirname,
    entry: {
        app: './front/js/index.js',
    },

    output: {
        path: path.resolve('./front/bundles/'),
        filename: '[name].js'
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),

        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
        }),

    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },

            // this will apply to both plain .js files
            // AND <script> blocks in vue files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpe?g|svg|eot|ttf|ijmap|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: 'static/bundles/',
                        },
                    },
                ],
            },
            // AND <style> blocks in vue files
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },

            // this will apply to both plain .scss files
            // AND <style lang="scss"> blocks in vue files
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            data: '$color: red;'
                        }
                    }
                ]
            },
        ]
    },

    resolve: {
        alias: {vue: 'vue/dist/vue.js'}
    },

};
