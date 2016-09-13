module.exports = function (config) {

    config.set({

        basePath: '../',

        frameworks: ['mocha', 'chai'],

        files: [
            'test/test.js'
        ],

        preprocessors: {
            'test/test.js': ['webpack']
        },

        webpack: {
            module: {

                loaders: [{
                    test:   /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]

            }
        },

        plugins: [
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-mocha-reporter')
        ],

        reporters: ['mocha'],

        mochaReporter: {
            colors: {
                error: 'bgRed'
            }
        },

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        logLevel: config.LOG_INFO,

        browsers: ['Chrome']

    });
};