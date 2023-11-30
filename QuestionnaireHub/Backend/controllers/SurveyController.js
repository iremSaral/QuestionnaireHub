import db from '../DataBase.js'

//Get all surveys
const surveylist = (req, res) => {
  const que = "SELECT * FROM surveys"
  db.query(que, (err, data) => {
    if (err) res.json({ Mess: 'No record found' })
    else res.json({ status: true, datas: data })
  })

}

//Add new survey
const surveyAdd = (req, res) => {
  const que = "INSERT INTO surveys (`title`,`description`,`date`,`user_id`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.id,
  ]
  db.query(que, [values], (err, data) => {
    if (err) return res.json({ Mess: "Survey creation failed, please check the information." });
    else {
      const surveyid = data.insertId;//Eklenen son survey in id sini alırız

      return res.json({ status: true, surveyid: surveyid });
    }
  })
}

//Delete survey
const surveydelete = (req, res) => {
  const que = "DELETE FROM surveys WHERE survey_id = ?";
  db.query(que, [req.body.survey_id], (err, result) => {
    if (err) {
      return res.json({ Mess: "An error occurred during survey deletion" })
    }
    return res.json({ status: "deleted" });
  });
};

//Get survey to solve it
const getsurvey = (req, res) => {
  const que = "SELECT * FROM surveys WHERE survey_id= ?";
  db.query(que, [req.body.survey_id], (err, data) => {
    if (err) {
      return res.json({ Mess: " 'No record found'" });
    }
    return res.json(data[0]);
  })
}

//survey and ıts question
const getSurveyDetail = (req, res) => {
  const que = " SELECT * FROM question INNER JOIN surveys ON question.survey_id = surveys.survey_id WHERE question.survey_id =?"
  db.query(que, [req.body.survey_id], (err, data) => {
    if (err) {
      return res.json({ Mess: " 'No record found'" });
    }
    return res.json(data);
  })
}

//Update survey data 
const updateSurvey = (req, res) => {
  const que = "UPDATE surveys SET title=?,description=? WHERE survey_id=?";
  const values = [
    req.body.data.title,
    req.body.data.description,
    req.body.data.survey_id,
  ]
  db.query(que, [...values], (err, data) => {
    if (err) {
      return res.json(err)
      //return res.json({ Mess: "Update failed" });
    }
    return res.json(data);
  })
}
export default { surveylist, surveyAdd, surveydelete, getsurvey, getSurveyDetail, updateSurvey }
