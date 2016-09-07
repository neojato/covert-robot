'use strict';

/**
 * @ngdoc function
 * @name covertRobotApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the covertRobotApp
 */
angular.module('covertRobotApp')
  .controller('PlayerCtrl', function ($scope, $location, $routeParams, $firebaseAuth, $firebaseArray, $mdDialog, PlayerService) {
    var ref = firebase.database().ref();

    $firebaseAuth().$signInAnonymously().then(function (firebaseUser) {
      console.log('Signed in as:', firebaseUser.uid);
      $scope.currentQuiz = $firebaseArray(ref.child('quiz').orderByChild('state').equalTo('waiting'));
    }).catch(function(error) {
      console.error('Authentication failed:', error);
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
    
    $scope.join = function (ev, PIN) {
      $scope.joining = true;
      if (PIN) {
        PlayerService.join(PIN)
        .then(function () {
          $location.path('/player/' + PIN);
        });
      } else {
        $scope.joining = false;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#main-content')))
            .clickOutsideToClose(true)
            .title('Whoops!')
            .textContent('It doesn\'t look like a quiz has started yet. Please wait for the host to join.')
            .ariaLabel('Too Early Alert')
            .ok('Got it!')
            .targetEvent(ev)
        );
      }
    };
    
    $scope.saveAnswer = function (answer) {
      PlayerService.selfSave('answer', answer);
    };

    $scope.startOver = function () {
      $location.path('/player');
    };
  });
