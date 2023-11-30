import React, { useEffect,useState } from 'react'
import { getDetail } from '../functions/SurveyFunctions'
import { useLocation, useNavigate } from 'react-router-dom';
import SurveyDetail from '../components/SurveyDetail';
function Edit() {
  const location = useLocation();

  return (
    <div className='vh-100 vw-100 mainBackground justify-content-center' style={{ color: "#F1ECE8", overflowY: 'auto' }}>
     <SurveyDetail survey_id={location.state.survey_id} func={1} />
     
    </div>
  )
}

export default Edit