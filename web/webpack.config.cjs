const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const config = yargs(hideBin(process.argv)).argv;

module.exports = {
    entry: ['@babel/polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        // publicPath: undefined,
        // contentBase: path.resolve(__dirname, 'dist'),
        // compress: false,
        host: config.host,
        // hot: false,
        port: config.port,
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
    ],
};
