//İmport Necessary Libraries
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginSchema } from '../validations/loginValidations';
import '../App.css'
const Login = () => {

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  axios.defaults.withCredentials = true //to use cookies

  //to read value that input box
  const handleChange = (e) => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  //Login 
  const handleSubmit = async (event) => {
    const isValid = await loginSchema.isValid(userInfo)
   // console.log(isValid)
    if (isValid) {
      event.preventDefault();
      axios.post("http://localhost:8080/login", userInfo)
        .then(res => {
          if (res.data.status) navigate('/')
          else alert(res.data.Mess)
        })
        .catch(err => console.log(err));
    } else alert("Incomplete data cannot be entered. Please try again.")
  }

  return (
    <div className='d-flex vh-100 vw-100 align-items-center justify-content-center window.scrollY="auto"' style={{ background: "linear-gradient(100deg,#223C53,#6E8891)" }}>
      <div className="d-flex flex-column p-5 col-md-5 col-lg-3" style={{ boxShadow: "0 0.1em 1em #d3d6dd", backgroundColor: "#D3D6DD" }}>
        <h3 className='text-center mb-3 p-1' style={{ fontFamily: "Playfair Display", fontWeight: "bolder", color: "#486477" }}> OuestionnaireHub</h3>
        <form onChange={handleChange} >
          <div className='d-flex flex-column mb-3'>
            <label htmlFor='email'>E-posta </label>
            <input type='email' placeholder='E-posta' className='form-control' name='email' onChange={handleChange} />
          </div>
          <div className='d-flex flex-column mb-3'>
            <label htmlFor='password'>Password </label>
            <input type='password' placeholder='Şifre' className='form-control' name='password' onChange={handleChange} />
          </div>
          <button type='submit' className='btn button mt-3' style={{ cursor: "pointer"}} onClick={handleSubmit}>Login</button>
         
            <p className='mt-10' style={{ color: "#223C53", fontWeight: "initial",cursor:"pointer", fontSize: '14px',marginTop: '20px' }} onClick={() => navigate("/Register")}>
            You don't have an account, 
Create new one ?
            </p>

        </form>
      </div>
    </div>
  );

}
export default Login;
