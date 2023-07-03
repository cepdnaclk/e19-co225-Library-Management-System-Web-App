import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/RegisterForm.css'

export const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [dob, setDOB] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: pass,
            address: address,
            birthday: dob,
            contact: phone
          };
        
          axios.post('http://localhost:8080/api/v1/auth/register', formData)
            .then(response => {
              // Handle the response from the API
              console.log(response.data);

                const accessToken = response.data.access_token;
                const user = response.data.user;

                if (accessToken && user==='MEMBER') {
                    localStorage.setItem('accessToken', accessToken);
                    navigate('/member');
                }
            })
            .catch(error => {
              // Handle any errors that occurred during the request
              console.error(error);
              window.alert(error);
            });
    }

    return (
      <div className="register-container">
      <div className="container">
                <div className="form-container sign-in-container">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1 className="heading-register">Register</h1>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required/>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required/>
                        <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required/>
                        <input value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required/>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" required/>
                        <input value={dob} onChange={(e) => setDOB(e.target.value)} type="date" placeholder="Birthday" required/>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Number" required/>
                        <button className="register-button" type="submit">Register</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 className="heading-right-panel">Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => navigate('/')}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}
