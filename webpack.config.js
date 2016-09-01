module.exports = {
    entry: "./controller.js",
    output: {
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
            }
        ]
    }
};