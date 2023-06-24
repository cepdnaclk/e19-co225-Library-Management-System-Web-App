import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css';

export const Login = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

        const formData = {
            email: email,
            password: pass
          };
        
          axios.post('http://localhost:8080/api/v1/auth/authenticate', formData)
            .then(response => {
              console.log(response.data);

                const accessToken = response.data.access_token;
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    navigate('/booklist');
                }
            })
            .catch(error => {
              console.error(error);
            });
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button className="register-btn" type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}