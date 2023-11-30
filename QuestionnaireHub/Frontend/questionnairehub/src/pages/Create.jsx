import React, { useState } from 'react'
import '../App.css'
import SurveyContainer from '../components/SurveyContainer';
import { useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate()
    const handleSuccessSaved = () => {
        navigate("/")
    }
    const cancel=()=>{
        navigate("/")
    }

    return (
        <div className='d-flex vh-100 mw-100 justify-content-center align-items-center' style={{ background: "linear-gradient(100deg, #223C53, #6E8891)", overflowY: 'auto' }}>
            <div className='d-flex flex-column p-4 ' style={{ backgroundColor: "#486477", border: "2px solid #223C53", width: '40%', height: '90%', marginTop: "3%", minWidth: '500px', overflowx: 'auto', minHeight: '600px' }}>
                <SurveyContainer />
                <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}>
                    <button type="button" className="btn btn-warning" style={{ marginRight: '10px' }} onClick={handleSuccessSaved}>Save Survey</button>
                    <button type="button" className="btn btn-danger" onClick={()=>cancel()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Create