'use strict';

/**
 * @ngdoc overview
 * @name covertRobotApp
 * @description
 * # covertRobotApp
 *
 * Main module of the application.
 */

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function ($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

angular
  .module('covertRobotApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase',
    'underscore',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    // Firebase Config
    var config = {
      apiKey: "AIzaSyArWnl14u5PH1-Z-KLnI_-IDm6I6WB5D7o",
      authDomain: "covert-robot.firebaseapp.com",
      databaseURL: "https://covert-robot.firebaseio.com",
      storageBucket: "covert-robot.appspot.com"
    };
    firebase.initializeApp(config);

    // MD Theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'hue-1': '50',
        'hue-2': '100',
        'hue-3': '800'
      })
      .accentPalette('blue-grey')
      .backgroundPalette('grey', {
        'hue-1': '100',
        'hue-2': '400',
        'hue-3': '900'
      });

    // HTML5 Routes
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/host/:PIN', {
        templateUrl: 'views/host.html',
        controller: 'HostCtrl',
        controllerAs: 'host'
      })
      .when('/player/:PIN?', {
        templateUrl: 'views/player.html',
        controller: 'PlayerCtrl',
        controllerAs: 'player'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
