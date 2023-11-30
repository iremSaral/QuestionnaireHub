import React, { useEffect, useState } from 'react'
import { getDetail, updateSurvey } from '../functions/SurveyFunctions'
import { useNavigate } from 'react-router-dom';
import { getResponse } from '../functions/ResponseFunction';
import axios from 'axios';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { deleteQuestion } from '../functions/QueFunctions';
import { deleteResponse } from '../functions/ResponseFunction';
import { AiOutlineDelete } from "react-icons/ai"

function SurveyDetail({ survey_id, func, user_id }) {
    const navigate = useNavigate();
    const [
        detail, setDetail] = useState({
            title: "",
            description: "",
            question: [{
                text: "",
                question_id: 0,
                type: ""
            }]
        })
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        fetchDetail()
        fetchAnswers()
    }, [user_id, detail])

    //Get Surveys Answer 
    const fetchAnswers = async () => {
        try {
            const res = await getResponse(survey_id, user_id);
            //console.log(answer)
            setAnswer((prev) => [
                ...prev,
                res.data.map((item) => ({
                    question_id: item.question_id,
                    data: item.text,
                })),
            ]);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };


    //Get Surveys Detail Info
    const fetchDetail = async () => {
        //console.log(detail)
        const res = await getDetail(survey_id);
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

    //Update Datas
    const updatesurvey = async () => {
        const res = await updateSurvey({
            title: detail.title,
            description: detail.description, survey_id: survey_id
        });
        console.log(res);
        navigate('/')
    }

    const updateQuestion = async () => {
        console.log("first")
        for (const item of detail.question) {
            try {
                const res = await axios.post("http://localhost:8080/question/update", item);
                console.log(res.data);
            } catch (error) {
                console.error("Error updating question:", error);
            }
        }

        updatesurvey();
    };
    const handleDeleteQuestion = async (question_id) => {
        const res = await deleteQuestion(question_id)
        console.log(res)
    }

    //Silinecek sorunun cevaplarını temizler
    const handleDeleteResAuto = async (question_id) => {
        const response = await deleteResponse(question_id)

        handleDeleteQuestion(question_id)


    }

    const handleChange = (e, question_id) => {
        if (e.target.name === 'title' || e.target.name === 'description') {
            setDetail(prev => ({ ...prev, [e.target.name]: e.target.value }));
        } else {
            setDetail(prev => ({
                ...prev,
                question: prev.question.map(item => {
                    if (item.question_id === question_id) {
                        return { ...item, text: e.target.value };
                    }
                    return item;
                }),
            }));
        }
        console.log(detail);
    };


    return (
        <div className='vh-100 vw-100 mainBackground justify-content-center' style={{ color: "#F1ECE8", overflowY: 'auto' }}>
            <div className='d-flex flex-column p-4  ' style={{ backgroundColor: "#486477", border: "2px solid #223C53", width: '40%', height: '90%', marginTop: "3%", minWidth: '500px', overflowX: 'auto', overflowY: 'auto', minHeight: '600px' }}>
                {func ?
                    <div className='d-flex flex-column justify-content-center  '>
                        <input className='fs-4 mt-2 text-center' name='title' onChange={handleChange} defaultValue={detail.title}></input>
                        <input className='fs-4 mt-2 text-center' name='description' onChange={handleChange} defaultValue={detail.description}></input>
                        <div className='mt-3'>
                            {detail.question.map(item => (
                                <div key={item.question_id} className='d-flex flex-column p-3 border-bottom  mt-3' style={{ overflowY: 'auto' }}>
                                    <li className='list-group-item'>
                                        <input name={`question_${item.question_id}`} onChange={(e) => handleChange(e, item.question_id)} defaultValue={item.text}></input>
                                        <AiOutlineDelete className='m-2' onClick={() => handleDeleteResAuto(item.question_id)} />
                                    </li>
                                </div>
                            ))}
                        </div>
                        <div className='mt-3 d-flex justify-content-between align-items-center'>
                            <button type="button" className="btn btn-warning" style={{ marginRight: '10px' }} onClick={updateQuestion}  >Save Survey</button>
                            <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button>
                        </div>
                    </div> :
                    <div className='d-flex flex-column justify-content-center text-align-center text-center'>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <MdOutlineArrowBackIosNew style={{ color: 'orange', fontSize: "30px" }} onClick={() => navigate('/')} />
                            <label className='fs-1 fw-bolder'>{detail.title}</label>
                            <CiEdit style={{ color: "orange", fontSize: '30px' }} onClick={() => navigate('/Solve', { state: { survey_id: survey_id, user_id: user_id, answer: answer } })} />
                        </div>
                        <label className='fs-5 fw-bold'>{detail.description}</label>
                        <div>
                            {detail.question.map(item => (
                                <div key={item.question_id} className='d-flex flex-column p-1 m-3 border-bottom ' style={{ overflowY: 'auto', backgroundColor: '#F1ECE8' }}>
                                    <li key={item.question_id} className='list-group-item'>
                                        <p style={{ color: "#223C53" }}>{item.text}</p>
                                        {answer && Array.isArray(answer[0]) ?
                                            answer[0].filter(answerItem => answerItem.question_id === item.question_id)
                                                .map(answerItem => (
                                                    <div className='d-flex flex-row  justify-content-between '>
                                                        <p style={{ color: "orange", marginLeft: "50%" }} key={answerItem.response_id}>{answerItem.data}</p>
                                                    </div>

                                                ))
                                            : <div></div>
                                        }


                                    </li>

                                </div>
                            ))}
                        </div>

                    </div>
                }

            </div>
        </div>
    )
}

export default SurveyDetail