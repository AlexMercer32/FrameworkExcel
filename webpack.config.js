const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV ==='production'
const isDev = !isProd

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [

                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ],
    },
    output: {
        filename: 'bundle[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        //import ../../../components/header  / @src  /  @
        alias: {
        '@' : path.resolve(__dirname,'src'),
            '@core' : path.resolve(__dirname,'src/core'),

        }
    },
    devtool: isDev?'source-map':false,
    devServer: {
        port: 3000,

    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: 'index.html',
                minify: {
                    removeComments: isProd,
                    collapseWhitespace: isProd
                }
            }
        ),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname,'src/favicon.ico'),
                    to: path.resolve(__dirname,'dist') },

            ],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:"bundle.[hash].css"
        }),
        new ESLintPlugin(),

    ],

};
