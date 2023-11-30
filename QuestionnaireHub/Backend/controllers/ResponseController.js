
import db from '../DataBase.js';

//Add new answer
const saveAnswers=(req,res)=>{
    const que= "INSERT INTO response (`user_id`, `survey_id`, `question_id`,`text`) VALUES (?)"
    const data=[
        req.body.user_id,
        req.body.survey_id,
        req.body.question_id,
        req.body.text,
    ]
    db.query(que,[data],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

}
//Get Response from db
const getResponse = (req, res) => {
    const que = "SELECT * FROM response WHERE survey_id=?  AND user_id=? ";
    const values = [
        req.body.question_id,
        req.body.user_id
    ];
    db.query(que, values, (err, data) => {
      if(err) return res.json(err)
        return res.json(data)
    });
};
//Update
const updateResponse=(req,res)=>{
    const que='UPDATE response SET text = ? WHERE question_id = ? AND user_id=?'
    const values=[
        req.body.text,
        req.body.question_id,
        req.body.user_id
    ]
    db.query(que,[...values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

}
//deleteAuto
const responseAutoDelete=(req,res)=>{
    const que = "DELETE FROM response WHERE question_id = ?";
    db.query(que, [req.body.question_id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}
export default {saveAnswers,getResponse,updateResponse,responseAutoDelete}

 