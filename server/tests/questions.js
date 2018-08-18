import assert from 'assert';
import request from 'supertest';
import app from '../index';
import questions from '../database/questions';

describe('the GET /questions api endpoint', () => {
  it('returns all questions from database', async () => {
    const response = await request(app).get('/api/v1/questions');
    assert.equal(response.body.status, 'success');
    assert.equal(response.body.data.questions.length, questions.length);
  });
});

describe('the GET /questions/:id api endpoint', () => {
  it('returns a single question found from database', async () => {
    const { body } = await request(app).get('/api/v1/questions/34434');
    const { status, data } = body;
    assert.equal(status, 'success');
    assert.equal(data.question.id, 34434);
    assert.equal(data.question.title, 'Lorem Ipsum is simply dummy');
  });

  it('returns a 404 if question was not found.', async () => {
    const response = await request(app).get('/api/v1/questions/9324782347834');
    assert.equal(response.statusCode, 404);
    assert.equal(response.body.status, 'fail');
    assert.equal(response.body.data.message, 'Question not found.');
  });
});

describe('the POST /questions endpoint', () => {
  it('returns a newly created question', async () => {
    const dbCount = questions.length;
    const payload = {
      title: 'New question title',
      description: 'new question description',
      userId: 23232,
    };
    const { body } = await request(app).post('/api/v1/questions').send(payload);
    const { status, data } = body;
    assert.equal(status, 'success');
    assert.ok(data.question.id);
    assert.ok(data.question.created_at);
    assert.equal(data.question.title, payload.title);
    assert.equal(data.question.userId, payload.userId);
    assert.equal(data.question.description, payload.description);

    assert.equal(questions.length, dbCount + 1);
  });
});
