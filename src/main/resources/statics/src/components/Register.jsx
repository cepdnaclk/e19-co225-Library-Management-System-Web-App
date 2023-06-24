import React, { useState } from "react";
import axios from 'axios';
import './form.css';

export const Register = (props) => {
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
            })
            .catch(error => {
              // Handle any errors that occurred during the request
              console.error(error);
            });
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="firstname">First name</label>
            <input value={firstname} name="firstname" onChange={(e) => setFirstName(e.target.value)} id="firstname" placeholder="First Name" />
            <label htmlFor="lastname">Last name</label>
            <input value={lastname} name="lastname" onChange={(e) => setLastName(e.target.value)} id="lastname" placeholder="Last Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="dob">Birth Day</label>
            <input value={dob} name="dob" onChange={(e) => setDOB(e.target.value)} id="dob" placeholder="yyyy/mm/dd"/>
            <label htmlFor="phone">Phone Number</label>
            <input value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} id="phone" placeholder="0771234567"/>
            <label htmlFor="address">Address</label>
            <input value={address} name="address" onChange={(e) => setAddress(e.target.value)} id="address" placeholder="No: 23, colombo road, colombo."/>
            <button className="register-btn" type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}