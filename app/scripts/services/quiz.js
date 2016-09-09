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
      question: 'Name the two Sporting Kansas City players who represented the United States in the 2014 World Cup',
      wrong: ['Matt Besler & Dom Dwyer','Grahman Zusi & Benny Feilhaber','Dom Dwyer & Ike Opara'],
      answer: 'Matt Besler & Graham Zusi',
      image: 'Q1.gif'
    },{
      question: 'What was the original name of the soccer team we now know as Sporting Kansas City?',
      wrong: ['Kansas City Wizards','Sporting Kansas City','Missouri Wizards'],
      answer: 'The Wiz',
      image: 'Q2.png'
    },{
      question: 'How many times has the Sporting KC club won the MLS cup (including under their previous names)?',
      wrong: ['Once in 2000','Once in 2013','Twice. In 2001 and 2008'],
      answer: 'Twice. In  2000 and 2013',
      image: 'Q3.jpg'
    },{
    //   question: 'Which of these elements does not inspire the KC current logo?',
    //   wrong: ['Asclepius Rod that represents health and fitness','A Greek statue called the Winged Victory of the Samothrace','Lines on the badge replicate the state lines of Kansas and Missouri'],
    //   answer: 'Armour shape to show camaraderie towards the Kansas City Knights',
    //   image: 'Q4.gif'
    // },{
      question: 'Which is the correct chronological naming order for the team?',
      wrong: ['KC Wizards, Wiz, Sporting KC','Sporting KC, Wiz, KC Wizards','KC Wizards, Sporting KC, Wiz'],
      answer: 'Wiz, KC Wizards, Sporting KC',
      image: 'Q5.gif'
    },{
      question: 'When was their first game?',
      wrong: ['April 5, 2000','April 10th, 1990','April 8th, 1998'],
      answer: 'April 13th ,1996',
      image: 'Q6.jpg'
    },{
      question: 'When were they founded?',
      wrong: ['1996','1994','1998'],
      answer: '1995',
      image: 'Q7.gif'
    },{
      question: 'Name two players that are home-grown players?',
      wrong: ['Graham Zusi & Daniel Salloi','Diego Rubio & Cameron Porter','Jacob Peterson & Ike Opara'],
      answer: 'Matt Besler & Kevin Ellis',
      image: 'Q8.gif'
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
