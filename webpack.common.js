const webpack = require("webpack");
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
    entry: {
        bundle: './src/main.js',
        print_bundle: './src/print.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new WebpackAutoInject({
            PACKAGE_JSON_PATH: './package.json',
            components: {
                AutoIncreaseVersion: false,
                InjectAsComment: false,
                InjectByTag: true
            },
            componentsOptions: {
                InjectByTag: {
                    fileRegex: /\.+/,
                }
            }
        }),
        // new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Production'
        // }),
        new CopyWebpackPlugin([
            { from: './src/index.html' },
            { from: './src/midi.html' },
            { from: './src/print.html' },
            { from: './src/templates/patch-sheet-template.html', to: 'templates'},
            { from: './src/css/midi.css', to: 'css' },
            { from: './src/favicon.png' }
        ])
    ],
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};