module.exports = {
    entry: "./src/controller.js",
    output: {
        filename: "./build/bundle.js"
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