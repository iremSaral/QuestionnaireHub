import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeMess from '../components/WelcomeMess';
import SurveyList from '../components/SurveyList';

function Home() {

  const [auth, setAuth] = useState(false); //Authentication control
  const [name, setName] = useState(""); //Get user's name
  const [showWelcome, setShowWelcome] = useState(true); //Message box status control
  const [userStatu, setUsetStatu] = useState(0);//Default - not admin
  const [userid, setUserId] = useState(0)//pprops userid
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  //We control auth with useEffect. Returns true if cookie token exists
  useEffect(() => {
    console.log(userStatu)
    axios.get("http://localhost:8080")
      .then(res => {
        if (res.data.status) {
          setAuth(true);
          setName(res.data.name);
          console.log(res.data.user_id);
          setUsetStatu(res.data.admin);
          setUserId(res.data.user_id)
        }
        else {
          setAuth(false)
          //setMessage(res.data.Mess)
        }
      })

  }, [])

  //Logout from app 
  const handleLogOut = () => {
    axios.get("http://localhost:8080/logout")
      .then(res => {
        res.data.Mess ? navigate("/Login") : alert("Error")
      }).catch(err => console.log(err))
  }

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <div className='d-flex vh-100 vw-100  window.scrollY="auto"' style={{ background: "linear-gradient(100deg,#223C53,#6E8891)" }}>
      {showWelcome ?
        <WelcomeMess onClose={handleCloseWelcome} user={name} auth={auth} />
        :
        <div className='d-flex vh-100 vw-100  window.scrollY="auto"' style={{ background: "linear-gradient(100deg,#223C53,#6E8891)" }}>
          <div className='d-flex flex-column align-items-start justify-content-center p-4 m-3' style={{ backgroundColor: '#486477', width: '120px', margin: '20px 0' }}>
            <p
              style={{ fontFamily: "Playfair Display", fontWeight: "bold", fontSize: "20", color: "white" }} onClick={handleLogOut}>Log Out</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center p-4 vh-100 vw-100 " style={{ minHeight: "100%", overflowY: 'auto' }}>
            <SurveyList admin={userStatu} user_id={userid} />
          </div>
        </div>
      }
    </div>

  )
}

export default Home
