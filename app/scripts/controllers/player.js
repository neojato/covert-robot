'use strict';

/**
 * @ngdoc function
 * @name covertRobotApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the covertRobotApp
 */
angular.module('covertRobotApp')
  .controller('PlayerCtrl', function ($scope, $location, $routeParams, $firebaseAuth, $firebaseArray, PlayerService) {
    var ref = firebase.database().ref();

    $scope.currentQuiz = $firebaseArray(ref.child('quiz').orderByChild('state').equalTo('waiting'));

    $firebaseAuth().$signInAnonymously().then(function (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
    
    if (!$routeParams.hasOwnProperty('PIN')) {
      $scope.quiz = {
        state: 'joinQuiz'
      };
    } else {
      PlayerService.init($routeParams.PIN)
      .then(function () {
        PlayerService.obj.$bindTo($scope, 'quiz')
        .then(function () {
          $scope.currentQuestion = $scope.quiz.questions[$scope.quiz.currentQuestion];
          $scope.$watch('quiz.currentQuestion', function (newValue, oldValue) {
            $scope.currentQuestion = $scope.quiz.questions[$scope.quiz.currentQuestion];
          });
        });
        
        $scope.playerId = PlayerService.getUniqueId();
      });
    }
    
    $scope.join = function (PIN) {
      $scope.joining = true;
      PlayerService.join(PIN)
      .then(function () {
        $location.path('/player/' + PIN);
      });
    };
    
    $scope.saveAnswer = function (answer) {
      PlayerService.selfSave('answer', answer);
    };

    $scope.startOver = function () {
      $location.path('/player');
    }
  });
