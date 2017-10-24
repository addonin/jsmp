const webpackConfig = require('./webpack.config.js');
const commonsChunkPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin.chunkNames);
webpackConfig.plugins.splice(commonsChunkPluginIndex, 1);

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'test/index.spec.js',
      'src/js/index.js'
    ],
    preprocessors: {
        'src/js/index.js': ['webpack'],
        'test/index.spec.js': ['webpack']
    },
    reporters: ['progress'],
    webpack: webpackConfig
  });
};
