module.exports = {
    entry: "./src/application.js",
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