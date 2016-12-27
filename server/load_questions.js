var config = require('./config'),
  knex = require('knex')(config.knex_options),
  Promise = require('knex/lib/promise');

var startq = {
  'question': 'start',
  'answers': JSON.stringify(['start']),
  'answer_index': 1,
  'show': true
};

var qs = [
{
  'question': 'Join this game?',
  'answers': ['YES!!'],
  'answer_index': 1
}];

knex('questions').del().then(function() {
  return knex('questions').insert(startq);
}).then(function() {
  return Promise.map(qs, function(question) {
    console.log("Creating ", question.question);
    question.answers = JSON.stringify(question.answers);
    return knex('questions').insert(question);
  });
}).then(function() {
  knex('questions').insert({
    question: 'end',
    answers: '["end"]',
    answer_index: 1
  }).then(function() {
    process.exit(0);
  });
});
