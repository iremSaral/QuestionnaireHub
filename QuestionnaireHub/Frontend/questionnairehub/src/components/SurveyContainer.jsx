import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import '../App.css'
import { createSurvey } from '../functions/SurveyFunctions';
import QuestionContainer from './QuestionContainer';
import { getSpeSurvey } from '../functions/SurveyFunctions';

export default function SurveyContainer() {
    const location = useLocation();
    //admin ıd
    const user_id = location.state.user_id;
    //survey id
    const [surveyid, setSurveyId] = useState(0);
    //Get Survey Data
    const [survey, setSurvey] = useState({
        title: "",
        description: "",
        date: new Date(),
        id: user_id
    })
    const [selectedDate, setSelectedDate] = useState(survey.date ? new Date(survey.date) : null);

    // set survey data 
    const handleChange = (e) => {
        setSurvey(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(survey)
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleChange({ target: { name: 'date', value: date } });
      };
      
    const runCreateSurvey = async () => {
        const getId = await createSurvey({ survey });
        setSurveyId(getId)

    }
    //question,;?
    const [questionContainers, setQuestionContainers] = useState([]);

    const handleAddClick = () => {
        setQuestionContainers(prevContainers => [...prevContainers, <QuestionContainer key={prevContainers.length} surveyid={surveyid} />]);
    };

    useEffect(()=>{
        if(location.state.survey_id){
          ısTheresurvey(surveyid)
            setSurveyId(location.state.survey_id)
       }
    },[])
    const ısTheresurvey=async()=>{
        const res=await getSpeSurvey(location.state.survey_id);
       // console.log(res)
     setSurvey({
        title:res.title,
        description:res.description

     })
     console.log(survey)
        }

    const cancelSave = () => {
        setSurvey({
            title: "",
            description: "",
            date: "",
            id: user_id
        })
    }

    return (
        <div>{
            !surveyid ? <div>  <div className='d-flex flex-row '>
                <input onChange={handleChange} name='title' className='p-2 mt-3 flex-grow-1 mr-3 ' placeholder='Title' value={survey.title} />
                <label className='p-2 mt-3 flex-grow-1' style={{ color: "white" }}> {user_id} </label>
            </div>
                <div className='d-flex flex-row justify-content-between'>
                    <input onChange={handleChange} name='description' className='p-2 mt-3 flex-grow-1 mr-2' placeholder='description' value={survey.description} />
               
                    <input name='date' onChange={handleChange} className='p-2 mt-3 flex-grow-1 mr-2'/>
                </div>

                <button className='surveyButton' onClick={() => runCreateSurvey()} >Create Survey </button>
                <button className='surveyButton' onClick={() => cancelSave()}>Cancel</button>
            </div> :
                <div>
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <div className='d-flex flex-column  align-items-center' style={{ color: "#F1ECE8", fontFamily: "PlayFair Display" }} >
                            <label className='fs-1 fw-bolder'> {survey.title}</label>
                            <label className='fs-5 fw-bold'>{survey.description}</label>
                        </div>
                        <div><div>
                            {questionContainers}
                            <div className='d-flex flex-row'>
                                <label className='mt-2 p-2' style={{ color: 'white' }}>Questions</label>
                                <IoMdAdd className='mt-2 p-2' style={{ color: 'white' }} size={40} onClick={handleAddClick} />
                            </div>
                        </div>
                        </div>

                    </div>
                </div>}
        </div>
    )
}
