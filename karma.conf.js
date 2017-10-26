const webpackConfig = require('./webpack.karma.config.js');
// const commonsChunkPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin.chunkNames);
// webpackConfig.plugins.splice(commonsChunkPluginIndex, 1);

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'test/**/*.spec.js'
    ],
    exclude: [
        'test/index.spec.js'
    ],
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },
    reporters: ['progress'],
    webpack: webpackConfig
  });
};
