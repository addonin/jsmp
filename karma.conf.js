module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'src/index.js',
      'test/index.spec.js',
    ],
    reporters: ['progress'],
  });
};
