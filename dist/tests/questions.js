'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _questions = require('../database/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the GET /questions api endpoint', function () {
  it('returns all questions from database', async function () {
    var response = await (0, _supertest2.default)(_index2.default).get('/api/v1/questions');
    _assert2.default.equal(response.body.status, 'success');
    _assert2.default.equal(response.body.data.questions.length, _questions2.default.length);
  });
});

describe('the GET /questions/:id api endpoint', function () {
  it('returns a single question found from database', async function () {
    var _ref = await (0, _supertest2.default)(_index2.default).get('/api/v1/questions/34434'),
        body = _ref.body;

    var status = body.status,
        data = body.data;

    _assert2.default.equal(status, 'success');
    _assert2.default.equal(data.question.id, 34434);
    _assert2.default.equal(data.question.title, 'Lorem Ipsum is simply dummy');
  });

  it('returns a 404 if question was not found.', async function () {
    var response = await (0, _supertest2.default)(_index2.default).get('/api/v1/questions/9324782347834');
    _assert2.default.equal(response.statusCode, 404);
    _assert2.default.equal(response.body.status, 'fail');
    _assert2.default.equal(response.body.data.message, 'Question not found.');
  });
});

describe('the POST /questions endpoint', function () {
  it('returns a newly created question', async function () {
    var dbCount = _questions2.default.length;
    var payload = {
      title: 'New question title',
      description: 'new question description',
      userId: 23232
    };

    var _ref2 = await (0, _supertest2.default)(_index2.default).post('/api/v1/questions').send(payload),
        body = _ref2.body;

    var status = body.status,
        data = body.data;

    _assert2.default.equal(status, 'success');
    _assert2.default.ok(data.question.id);
    _assert2.default.ok(data.question.created_at);
    _assert2.default.equal(data.question.title, payload.title);
    _assert2.default.equal(data.question.userId, payload.userId);
    _assert2.default.equal(data.question.description, payload.description);

    _assert2.default.equal(_questions2.default.length, dbCount + 1);
  });
});