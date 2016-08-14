'use strict';

/**
 * @ngdoc service
 * @name covertRobotApp.HostService
 * @description
 * # HostService
 * Service in the covertRobotApp.
 */
angular.module('covertRobotApp')
  .service('HostService', function ($firebaseObject, QuizService) {
    var self = this,
        ref = firebase.database().ref(),
        _obj;
    
    self.init = function (PIN) {
      self.obj = $firebaseObject(ref.child('quiz').child(PIN));
      _obj = self.obj;
      return self.obj.$loaded();
    };
    
    self.setupQuiz = function () {
      if (!_obj.hasOwnProperty('questions')) {
        _obj.questions = QuizService.getQuestions();
        _obj.currentQuestion = 0;
      }
      return _obj.$save();
    };
    
    self.getCurrentQuestion = function () {
      return _obj.questions[_obj.currentQuestion];
    };
    
    self.setQuizState = function (state) {
      _obj.state = state;
      return _obj.$save();
    };
    
    self.nextQuestion = function () {
      _obj.state = 'preQuestion';
      _obj.currentQuestion++;
      return _obj.$save();
    };
  });
