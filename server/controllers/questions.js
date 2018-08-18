import questions from '../database/questions';

export default class QuestionsController {
  static index(req, res) {
    res.json({
      status: 'success',
      data: {
        questions,
      },
    });
  }

  /**
   * Fetch a single question
   *
   * @param {Object} req express request object
   * @param {Object} res express response object
   */
  static show(req, res) {
    // get the id
    let { id } = req.params;

    id = parseInt(id, 10);
    // find the question with this id from the database (questions array)
    const finder = currentQuestionInLoop => currentQuestionInLoop.id === id;
    const question = questions.find(finder);
    // return question or a 404
    if (question) {
      return res.json({
        status: 'fail',
        data: {
          question,
        },
      });
    }

    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Question not found.',
      },
    });
  }

  static store(req, res) {
    // TODO: check if the data required was provided.
    // get the data from the request: title, description, userId
    const { title, description, userId } = req.body;
    // create new question using es6 shorthand.
    const question = {
      id: parseInt((Math.random() * 10000).toFixed(), 10),
      title,
      description,
      userId,
      repliesCount: 0,
      created_at: new Date(),
    };
    // add it to questions in database
    questions.push(question);
    // return the newly created question.
    return res.json({
      status: 'success',
      data: {
        question,
      },
    });
  }
}
