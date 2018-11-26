const webpackConfig = require('./webpack.config')

const isBench = process.env.BENCHMARK === 'true'

module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    files: ['tests.webpack.js'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map'
    }),
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      file: 'coverage.json',
      type: 'json'
    }
  })

  if (isBench) {
    Object.assign(config, {
      browsers: ['Chrome'],
      frameworks: ['benchmark'],
      files: ['benchmark/**/*.js'],
      preprocessors: {'benchmark/**/*.js': ['webpack']},
      reporters: ['benchmark']
    })
  }
}
