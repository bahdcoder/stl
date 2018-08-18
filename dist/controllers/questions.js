'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _questions = require('../database/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionsController = function () {
  function QuestionsController() {
    _classCallCheck(this, QuestionsController);
  }

  _createClass(QuestionsController, null, [{
    key: 'index',
    value: function index(req, res) {
      res.json({
        status: 'success',
        data: {
          questions: _questions2.default
        }
      });
    }

    /**
     * Fetch a single question
     *
     * @param {Object} req express request object
     * @param {Object} res express response object
     */

  }, {
    key: 'show',
    value: function show(req, res) {
      // get the id
      var id = req.params.id;


      id = parseInt(id, 10);
      // find the question with this id from the database (questions array)
      var finder = function finder(currentQuestionInLoop) {
        return currentQuestionInLoop.id === id;
      };
      var question = _questions2.default.find(finder);
      // return question or a 404
      if (question) {
        return res.json({
          status: 'success',
          data: {
            question: question
          }
        });
      }

      return res.status(404).json({
        status: 'fail',
        data: {
          message: 'Question not found.'
        }
      });
    }
  }, {
    key: 'store',
    value: function store(req, res) {
      // TODO: check if the data required was provided.
      // get the data from the request: title, description, userId
      var _req$body = req.body,
          title = _req$body.title,
          description = _req$body.description,
          userId = _req$body.userId;
      // create new question using es6 shorthand.

      var question = {
        id: parseInt((Math.random() * 10000).toFixed(), 10),
        title: title,
        description: description,
        userId: userId,
        repliesCount: 0,
        created_at: new Date()
      };
      // add it to questions in database
      _questions2.default.push(question);
      // return the newly created question.
      return res.json({
        status: 'success',
        data: {
          question: question
        }
      });
    }
  }]);

  return QuestionsController;
}();

exports.default = QuestionsController;