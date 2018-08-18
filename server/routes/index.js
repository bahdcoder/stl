import { Router } from 'express';

import QuestionsController from '../controllers/questions';

const router = new Router();

router.get('/questions', QuestionsController.index);
router.get('/questions/:id', QuestionsController.show);
router.post('/questions', QuestionsController.store);

export default router;
