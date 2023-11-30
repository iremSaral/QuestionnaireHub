import express from 'express';
import QuestionController from '../controllers/QuestionController.js';

const router=express.Router();

router.post('/question/add',QuestionController.questionAdd)
router.delete('/questions/delete/auto',QuestionController.questionAutoDelete)
router.post('/question/get/QueList',QuestionController.getQuestionList)
router.post('/question/update',QuestionController.updateQuestion)
router.delete('/question/delete',QuestionController.deleteQuestion)
export default router;