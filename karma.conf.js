//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'app-local.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.6/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.7.6/angular-animate.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.7.6/angular-aria.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.7.6/angular-messages.min.js',
      'http://ajax.googleapis.com/ajax/libs/angular_material/1.1.19/angular-material.min.js',
      'lib/angular-route/angular-route.js',
      'app.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'info/**/*.js',
      'core/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
