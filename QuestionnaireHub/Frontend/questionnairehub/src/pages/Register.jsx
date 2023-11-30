import React, { useState } from 'react'
import { registerScheme } from '../validations/RegistrationValid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
function Register() {

    const [user, setUser] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await registerScheme.isValid(user)
        //console.log(isValid)
        if (isValid) {
            e.preventDefault();
            axios.post("http://localhost:8080/user/add", user)
                .then(
                    res => {
                        if (res.data.status) {
                            navigate('/Login')
                        }
                    }
                )
        }
        else 
        Swal.fire({
            title: "",
            text: "Incomplete data cannot be entered. Please try again.",
            denyButtonText: `Close`
          })
    }
    
    return (
        <div className='d-flex vh-100 vw-100 col-md-5  align-items-center justify-content-center' style={{ background: "linear-gradient(100deg,#223C53,#6E8891)", overflowY: "auto", }}>
            <div className=" d-flex flex-column p-5 col-md-5 col-lg-3" style={{ boxShadow: "0 0.1em 1em #d3d6dd", backgroundColor: "#D3D6DD" }}>
                <h3>Create new account</h3>
                <form >
                    <div className='d-flex flex-row p-2' >
                        <label htmlFor='name' style={{ minWidth: '100px' }} >Name:</label>
                        <input type='text' placeholder='Name' name='name' onChange={handleChange} ></input>
                    </div>
                    <div className='d-flex flex-row p-2' >
                        <label style={{ minWidth: '100px' }}>Surname:</label>
                        <input type='text' placeholder='Surname' name='surname' onChange={handleChange} ></input>
                    </div>
                    <div className='d-flex flex-row p-2'>
                        <label style={{ minWidth: '100px' }}>Phone:</label>
                        <input type='tel' placeholder='+905**' name='phone' onChange={handleChange} />
                    </div>
                    <div className='d-flex flex-row p-2' >
                        <label style={{ minWidth: '100px' }}>Email:</label>
                        <input type='email' placeholder='E-posta' name='email' onChange={handleChange} />
                    </div>
                    <div className='d-flex flex-row p-2' >
                        <label style={{ minWidth: '100px' }}>Password:</label>
                        <input type='password' placeholder='Şifre' name='password' onChange={handleChange} />
                    </div>
                    <div className=' d-flex flex-row mt-5 justify-content-between '>
                        <button style={{ color: "#6E8891", backgroundColor: "#223C53" }} onClick={()=>navigate('/Login')}>Login</button>
                        <button onClick={handleSubmit}> Sign Up</button>

                    </div>
                </form>

            </div>

        </div>
    )
}

export default Register
