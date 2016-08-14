'use strict';

/**
 * @ngdoc function
 * @name covertRobotApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the covertRobotApp
 */
angular.module('covertRobotApp')
  .controller('HostCtrl', function ($scope, $routeParams, $location, $interval, $timeout, _, $firebaseArray, $firebaseObject, HostService, QuizService) {
    var betweenCounter = 5,
        questionCounter = 15;

    HostService.init($routeParams.PIN)
    .then(function () {
      return HostService.setupQuiz();
    })
    .then(function () {
      HostService.obj.$bindTo($scope, 'quiz');
      $scope.$watch('quiz.state', function (newValue, oldValue) {
        switch (newValue) {
          case 'preQuestion':
            $scope.startCountDown(betweenCounter, 'question');
            $scope.quiz.possibleAnswers = []
            break;
          
          case 'question':
            $scope.currentQuestion = HostService.getCurrentQuestion();
            $scope.quiz.possibleAnswers = QuizService.getPossibleAnswers($scope.currentQuestion);
            $timeout(function () {
              $scope.startCountDown(questionCounter, 'postQuestion')
            }, 100);
            break;
          
          case 'postQuestion':
            $scope.correct = [];
            $scope.wrong = [];
            $scope.currentQuestion = HostService.getCurrentQuestion();
            angular.forEach($scope.quiz.users, function (v, k) {
              if (QuizService.checkAnswer(HostService.getCurrentQuestion().question, v.answer)) {
                v.currentPoints = (v.currentPoints || 0 ) + 100;
                $scope.correct.push(v.screenName);
              } else {
                $scope.wrong.push(v.screenName);
              }
            });
            HostService.obj.$save();
            break;
          
          case 'leaderboard':
            $scope.leaderboard = _.map($scope.quiz.users, function (user) {
              return {
                screenName: user.screenName,
                currentPoints: (user.currentPoints || 0 )
              };
            });
            break;
        }
      });
    });
    
    $scope.startCountDown = function (counter, state) {
      $scope.countdown = counter;
      $interval(function () {
        $scope.countdown--;
      }, 1000, $scope.countdown)
      .then(function () {
        HostService.setQuizState(state);
      });
    };
    
    $scope.startQuiz = function () {
      $scope.quiz.state = 'preQuestion';
    };
    
    $scope.nextQuestion = function () {
      HostService.nextQuestion();
    };
    
    $scope.endQuiz = function () {
      HostService.setQuizState('leaderboard');
    };
    
    $scope.startOver = function () {
      $location.path('/');
    };
  });
