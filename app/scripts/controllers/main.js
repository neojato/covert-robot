'use strict';

/**
 * @ngdoc function
 * @name covertRobotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the covertRobotApp
 */
angular.module('covertRobotApp')
  .controller('MainCtrl', function ($location, _, $firebaseAuth, $firebaseObject) {
    var vm = this, obj,
        date = new Date(),
        ref = firebase.database().ref();
    
    vm.creatingQuiz = false;
    vm.copyright = date.getFullYear();

    vm.newQuiz = function () {
      vm.creatingQuiz = true;
      
      $firebaseAuth().$signInAnonymously().then(function () {
        // generate random 6 digit pincode for the quiz
        var PIN = _.random(100000, 999999);

        // create quiz in Firebase
        obj = $firebaseObject(ref.child('quiz').child(PIN));

        // build quiz object
        obj.$loaded().then(function () {
          obj.state = 'waiting';
          return obj.$save();
        })
        .then(function () {
          // navigate to host view
          $location.path('/host/' + PIN);
        });
      })
      .catch(function (error) {
        console.error('Auth Failed', error);
      });
    };
  });
