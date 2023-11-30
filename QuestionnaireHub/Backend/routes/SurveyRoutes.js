//  '/survey' den gelen istekleri yönlendirmek

import express from "express";
import surveyController from '../controllers/SurveyController.js'

const router = express.Router();


//Get all surveys
router.post('/survey/get', surveyController.surveylist)

//Add new survey
router.post('/survey/add', surveyController.surveyAdd)

//Delete survey
router.delete('/survey/delete',surveyController.surveydelete)

//Get specific survey
router.post('/survey/get/SpecificSurvey',surveyController.getsurvey)
 
//Get all info include surveys
router.post('/survey/getDetail',surveyController.getSurveyDetail)

//Update survey data 
router.post('/survey/update',surveyController.updateSurvey)

export default router;