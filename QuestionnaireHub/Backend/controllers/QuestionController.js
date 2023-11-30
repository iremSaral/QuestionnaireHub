import db from '../DataBase.js'
//Add new Question
const questionAdd = (req, res) => {
    const que = "INSERT INTO question (`survey_id`, `question`, `type`,`order`) VALUES (?)"
    const data = [
        req.body.survey_id,
        req.body.text,
        req.body.type,
        req.body.order
    ]
    db.query(que, [data], (err, data) => {
        if (err) return res.json(err)
        return res.json("ok")
    })
}
//Inquiries related to deleted tables are automatically removed from the database.
const questionAutoDelete = (req, res) => {
    const que = "DELETE FROM question WHERE survey_id = ?";
    db.query(que, [req.body.surveyid], (err, data) => {
        if (err) return res.json(err)
        return res.json(req.body)
    })
}
//Solve page question list
const getQuestionList = (req, res) => {
    const que = "SELECT * FROM question WHERE survey_id= ?";
    db.query(que, [req.body.survey_id], (err, data) => {
        if (err) {
            return res.json({ Mess: " 'No record found'" });
        }
        return res.json(data);
    })
}
//Update Question Data
const updateQuestion = (req, res) => {
    const que = "UPDATE question SET question=?,type=? WHERE question_id=?";
    const values = [
        req.body.text,
        req.body.type,
        req.body.question_id
    ]
    db.query(que, [...values], (err, data) => {
        if (err) {
            // return res.json(err)
            return res.json({ Mess: "Update failed" });
        }
        return res.json(data);
    })
}

//delete Question 
const deleteQuestion = (req,res) => {
    const que = "DELETE FROM question WHERE question_id = ?";
    db.query(que, [req.body.question_id], (err, data) => {
        if (err) return res.json(err)
        return res.json(req.body)
    })

}
export default { questionAdd, questionAutoDelete, getQuestionList, updateQuestion, deleteQuestion }