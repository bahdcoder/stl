'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _questions = require('../controllers/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/questions', _questions2.default.index);
router.get('/questions/:id', _questions2.default.show);
router.post('/questions', _questions2.default.store);

exports.default = router;