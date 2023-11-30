import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SurveyDetail from '../components/SurveyDetail';
import { getResponse } from '../functions/ResponseFunction';

function ShowInfo() {
    const location = useLocation();

    const survey_id=location.state.survey_id;
    const user_id=location.state.user_id;

   

    useEffect(()=>{
       // console.log(user_id)
    },[])
    return (
        <div className='vh-100 vw-100 mainBackground justify-content-center' style={{ color: "#F1ECE8", overflowY: 'auto' }}>
            <SurveyDetail survey_id={location.state.survey_id} user_id={user_id}func={0} />

        </div>
    )
}

export default ShowInfo