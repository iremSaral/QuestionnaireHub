import React from 'react'
import { AiFillCloseSquare } from "react-icons/ai";
import '../App.css';
import { useNavigate } from 'react-router-dom';

function WelcomeMess({ onClose, user, auth }) {

const navigate=useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100 text-align-center window.scrollX='auto' window.scrollY='auto'" style={{ position: "relative" }}>
            <div className="d-flex flex-column p-5 col-md-5 col-lg-3 position-relative" style={{ boxShadow: "0 0.1em 1em #d3d6dd", backgroundColor: "white", borderRadius: "8px" }}>
                {
                    auth ?
                        <>   
                         <AiFillCloseSquare className="position-absolute" style={{ width: "30px", height: "30px", cursor: "pointer", color: "#223C53", top: "10px", right: "10px" }}
                            onClick={onClose} />
                            <h2 style={{ color: "#223C53" }}>Welcome to Our Application!</h2>
                            <h3  style={{ color: "orange" }}>{user}</h3>
                            <p style={{ color: "#486477" }}>Explore and manage your surveys effortlessly. Here's what you can do:</p>
                            <ul>
                                <li style={{ color: "#486477" }}>View the surveys you've created.</li>
                                <li style={{ color: "#486477" }}>Add new surveys to gather valuable insights.</li>
                                <li style={{ color: "#486477" }}>Edit and update your existing surveys.</li>
                            </ul>
                            <p style={{ color: "#486477" }}>Start creating, collecting, and analyzing data with ease! If you have any questions, feel free to explore our FAQ section or contact us.</p>
                            <p style={{ color: "#486477" }}>Happy surveying!</p>
                        </>

                        : <>
                        <h2 style={{ color: "#223C53" }}> Questionnaire Hub </h2>
                        <p style={{ color: "#486477" }}>To benefit from this application, try logging in. </p>
                        <p style={{ color: "#486477" }}>If you don't have an account, you can create a new one.</p>
                        <p style={{ color: "#486477" }}>Happy surveying!</p>
                        <button className='btn button mt-3' style={{ cursor: "pointer"}} onClick={()=>navigate("/Login")}>Login</button>
                        <button className='btn button mt-3' style={{ cursor: "pointer"}} onClick={()=>navigate("/Register")}>Register</button>
                        </>
                }

            </div>
        </div>
    );

}

export default WelcomeMess