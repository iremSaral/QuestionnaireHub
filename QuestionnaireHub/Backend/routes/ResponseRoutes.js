import express from 'express'
import responseController from '../controllers/ResponseController.js';

const router=express.Router();

router.post("/response/save",responseController.saveAnswers);
router.post("/response/get",responseController.getResponse);
router.post("/response/update",responseController.updateResponse);
router.delete("/response/delete/auto",responseController.responseAutoDelete);

export default router;