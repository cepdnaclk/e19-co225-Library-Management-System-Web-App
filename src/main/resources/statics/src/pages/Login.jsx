import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo2.png';

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        localStorage.setItem('email', email);

        const formData = {
            email: email,
            password: pass
          };
        
          axios.post('http://192.168.8.110:8080/api/v1/auth/authenticate', formData)
            .then(response => {
              console.log(response.data);

                const accessToken = response.data.access_token;
                const user = response.data.user;

                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);

                    if(user==='MEMBER'){
                        navigate('/member');
                    }

                    if(user==='LIBRARIAN'){
                        navigate('/librarian');
                    }            
                }
            })
            .catch(error => {
                console.error(error);
                window.alert(error);
            });
    }

    return (
        <div className="register-container">
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <div className="logo-card">
                            <img src={Logo} alt="logo" className="logo"/>
                        </div>
                        <h1 className="heading-login">Sign in</h1>
                        <br></br>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required/>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required/>
                        <br></br>
                        <button className="sign-in" type="submit">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => navigate('/register')}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
