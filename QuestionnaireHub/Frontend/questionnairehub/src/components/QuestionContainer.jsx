import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QuestionContainer({ surveyid }) {
const navigate=useNavigate();
    const [queOrder, setQueOrder] = useState(1);//Soru sayısı
    const [typeRes, setTypeRes] = useState("text");
    const [ısSaved, setIsSaved] = useState(false);
    //Get question data
    const [questionData, setQuestionData] = useState({
        text: "",
        type: typeRes,
        order: queOrder,
        survey_id: surveyid
    })

    const handleType = (value) => {
        setTypeRes(value)
    };

    const handleChange = (e) => {
        setQuestionData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(questionData)
    }
    useEffect(() => {
        // typeRes değiştiğinde questionData'yı güncelle
        setQuestionData(prevData => ({
            ...prevData,
            type: typeRes,
            order: queOrder,
            survey_id: surveyid
        }));
        console.log(questionData)
    }, [typeRes, queOrder]);

    const addQuestion = async () => {
        const res = await axios.post("http://localhost:8080/question/add", questionData);
        if (res) {
            setQueOrder(prevOrder => prevOrder + 1)
            setIsSaved(true)
            console.log(res.data)
        }
        else console.log("error")
    }

    const cancel=()=>{
        setTypeRes("text")
        setQuestionData({
          text: "",
          type: typeRes, 
          order: queOrder,
          survey_id: surveyid,
        });
    }

    return (
        <div>
            <div className='d-flex flex-row p-2 mt-2 vw-100% ' style={{ minWidth: "100%",color:"#F1ECE8" }}>
                {ısSaved ? <div>{questionData.order}{questionData.text}</div> :
                    <div>
                        <Select
                        value={typeRes}
                            defaultValue={typeRes}
                            onChange={handleType} // Doğru şekilde fonksiyonu atayın
                            style={{ width: 'auto' }}
                            className='mt-1 m-1'
                            options={[
                                { value: 'text', label: 'text' },
                                { value: 'radio', label: 'Radio' },
                                { value: 'rate', label: 'Rate' },
                            ]}
                        />
                        <input className='flex-grow-1 p-2' key={queOrder} type="text" placeholder={"Question"} name='text' onChange={handleChange} value={questionData.text}/>
                        <button className='btn btn-success m-1' onClick={() => addQuestion()}>Save</button>
                        <button className='btn btn-danger m-1' onClick={()=>cancel()}>Cancel</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default QuestionContainer