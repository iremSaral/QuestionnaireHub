import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'
import axios from 'axios';
import { Radio, Rate } from 'antd';
import { getDetail } from '../functions/SurveyFunctions';


function Solve() {
  const navigate = useNavigate();
  const location = useLocation();
  const [detail, setDetail] = useState({
    title: "",
    description: "",
    question: [{
      text: "",
      question_id: 0,
      type: ""
    }]
  })
  const [answerList, setAnswerList] = useState([]);
  const prevAnswerList = [...answerList]

  const handleAnswer = (question_id, data) => {
    const newAnswerList = [...prevAnswerList];
    const existingAnswers = newAnswerList.find(item => item.hasOwnProperty('question_id')
      && item.question_id === question_id);
    if (existingAnswers) {
      existingAnswers.text = data; 
    } else {
      const newAnswers = {
        survey_id: location.state.survey_id,
        user_id: location.state.user_id,
        question_id: question_id,
        text: data
      };
      newAnswerList.push(newAnswers);
    }
    setAnswerList(newAnswerList)
    console.log(answerList)
  };

  const handleSaved = async () => {
    console.log("save")
    if (!answerList) {
      console.error("answerList is empty or undefined");
      return;
    }
    for (const item of answerList) {
      await axios.post("http://localhost:8080/response/save", item)
        .then(
          res => {
            console.log(res.data)
          })
    }
    navigate("/")
  }

  const handleUpdate = async () => {
    console.log("update")
    for (const item of answerList) {
      for (const ansItem of location.state.answer[0]) {
        if (item.question_id === ansItem.question_id) {
          await axios.post("http://localhost:8080/response/update", item)
            .then(
              res => {
                console.log(res.data)
              })
        }
        navigate("/")
      }
    }
  };

  const getSurveyDetail = async () => {
    const res = await getDetail(location.state.survey_id);
    if(res){
      setDetail({
        title: res[0].title,
        description: res[0].description,
        question:
          res.map(item => ({
            text: item.question,
            question_id: item.question_id,
            type: item.type
          }))
      })
    }
    else alert("hata")
    
    console.log(res)
  }

  //Create answer ınput 
  const answerType = (type, question_id, answerData) => {

    if (type === 'text')
      return (<input type="text" className='form-control' defaultValue={answerData ? answerData : ""} onChange={(e) => handleAnswer(question_id, e.target.value)}
      />)
    else if (type === 'rate')
      return (<Rate defaultValue={answerData ? answerData : 1} onChange={(value) => handleAnswer(question_id, value)} />)
    else if (type === 'radio')
      return (
        <Radio.Group defaultValue={answerData ? answerData : 1} onChange={(e) => {
          handleAnswer(question_id, e.target.value)
        }}>
          <Radio value={'1'}>Çok kötü</Radio>
          <Radio value={'2'}>Kötü</Radio>
          <Radio value={'3'}>İdare Eder</Radio>
          <Radio value={'4'}>Güzel</Radio>
          <Radio value={'5'}>Mükemmel</Radio>
        </Radio.Group>)
  }

  useEffect(() => {
    getSurveyDetail()
    

  }, [location.state.survey_id])

  return (
    <div className='vh-100 vw-100 mainBackground justify-content-center' style={{ color: "#F1ECE8", overflowY: 'auto' }}>
      <div className='d-flex flex-column p-4  ' style={{ backgroundColor: "#486477", border: "2px solid #223C53", width: '40%', height: '90%', marginTop: "3%", minWidth: '500px', overflowX: 'auto', overflowY: 'auto', minHeight: '600px' }}>
        <label className='fs-1 fw-bolder'>{detail.title}</label>
        <label className='fs-5 fw-bold'>{detail.description}</label>
        <div>
          {detail.question.map(item => (
            <div key={item.question_id} className='d-flex flex-column p-3 border-bottom ' style={{ overflowY: 'auto' }}>
              <li className='list-group-item'>
                <p>{item.text}</p>
                {(location.state.answer ?? []).length > 0 && location.state.answer[0].filter(answerItem => answerItem.question_id === item.question_id)
                  .map(answerItem => (
                    answerType(item.type, item.question_id, answerItem.data)
                  ))
                }
                {!(location.state.answer ?? []).length && (
                  answerType(item.type, item.question_id, []) 
                )}
              </li>
            </div>
          ))}
          <div className='mt-3 d-flex justify-content-between align-items-center'>
            <button type="button" className="btn btn-warning" style={{ marginRight: '10px' }}

              onClick={() => (location.state.answer ? handleUpdate() : handleSaved())}
            >Save Survey</button>
            <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Solve


