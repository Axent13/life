const webpackConfig = require('../webpack/webpack.config.js');

module.exports = function (config) {

  config.set({

    basePath: '../',

    frameworks: ['mocha', 'chai', 'jquery-1.8.3', 'sinon'],

    files: [
      'test/*.spec.js',
    ],

    preprocessors: {
      'test/*.spec.js': ['webpack']
    },

    webpack: {
      module: webpackConfig.module
    },

    plugins: [
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-mocha-reporter'),
      require('karma-jquery'),
      require('karma-sinon')
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