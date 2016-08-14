'use strict';

/**
 * @ngdoc service
 * @name covertRobotApp.QuizService
 * @description
 * # QuizService
 * Service in the covertRobotApp.
 */
angular.module('covertRobotApp')
  .service('QuizService', function (_) {
    var questions = [{
      question: 'What type of animal, when in a group, is called a “Rhumba”?',
      wrong: ['Panda','Flamingo','Elephant'],
      answer: 'Rattlesnake',
      image: 'Q1.gif'
    },{
      question: 'Which animal babies, when born, are larger than their mother?',
      wrong: ['Rats','Flies','Bees'],
      answer: 'Paradoxical Frog',
      image: 'Q2.gif'
    },{
      question: 'Which land mammals have no vertical leap?',
      wrong: ['Bears','Giraffe','Koala'],
      answer: 'Elephant',
      image: 'Q3.gif'
    },{
      question: 'Which animals use their own sweat as sunscreen?',
      wrong: ['Beavers','Lemurs','Horses'],
      answer: 'Hippos',
      image: 'Q4.gif'
    },{
      question: 'Typically, how long do male lions sleep?',
      wrong: ['5 hours a day','8 hours a day','15 hours a day'],
      answer: '20 hours a day',
      image: 'Q5.gif'
    },{
      question: 'Which of these have blue blood?',
      wrong: ['Jellyfish','Starfish','Sea Urchins'],
      answer: 'Octopus',
      image: 'Q6.jpg'
    },{
      question: 'How many knights are buried in British graveyards?',
      wrong: ['200,000','1,000,000+','53,000'],
      answer: 'None',
      image: 'Q7.gif'
    },{
      question: 'How many senses does the human body have?',
      wrong: ['5','4','7'],
      answer: '9+',
      image: 'Q8.gif'
    },{
      question: 'Goldfish can remember up to __________',
      wrong: ['5 seconds','3 minutes','6 hours'],
      answer: '5 months',
      image: 'Q9.gif'
    },{
      question: 'What color fur does a polar bear have?',
      wrong: ['White','Grey','Light Tan'],
      answer: 'Clear',
      image: 'Q10.gif'
    },{
      question: 'What office supply item would you use to defend yourself against an alligator?',
      wrong: ['A Pen','White-Out','A Post-it Note'],
      answer: 'A rubber band',
      image: 'Q11.gif'
    },{
      question: 'Can women smell fear?',
      wrong: ['No','Maybe?','Football'],
      answer: 'Yes',
      image: 'Q12.gif'
    }];

    var get = function () {
      return _.shuffle(questions);
    };

    var getAnswers = function (question) {
      return _.shuffle([question.answer].concat(question.wrong));
    };

    var check = function (qText, answer) {
      var question = _.find(questions, function (q) {
        return q.question === qText;
      });
      return question.answer === answer;
    };

    return {
      getQuestions: get,
      getPossibleAnswers: getAnswers,
      checkAnswer: check
    };
  });
