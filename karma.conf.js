const webpackConfig = require('./webpack.karma.config.js');
const commonsChunkPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin.chunkNames);
webpackConfig.plugins.splice(commonsChunkPluginIndex, 1);

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      /*'src/js/index.js',*/
      './src/js/calculator.js',
      /*'test/index.spec.js',*/
      './test/calculator.spec.js'
    ],
    preprocessors: {
        /*'src/js/index.js': ['webpack'],*/
        './src/js/calculator.js': ['webpack'],
        /*'test/index.spec.js': ['webpack'],*/
        './test/calculator.spec.js': ['webpack']
    },
    reporters: ['progress'],
    webpack: webpackConfig
  });
};
