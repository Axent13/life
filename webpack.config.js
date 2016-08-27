module.exports = {
    entry: "./controller.js",
    output: {
        filename: "bundle.js"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};