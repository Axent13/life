const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: "./src/js/application.js",
    output: {
        path: "build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "imports-loader?$=jquery&jQuery=jquery"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.pug']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.pug'
        }),
        new ExtractTextPlugin("styles.css")
    ]
};