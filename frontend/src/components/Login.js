import React from 'react'
import './FormStyles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handlelogin = async(e) => {
    e.preventDefault();
    const newUser = { email, password };
    const response = await axios.post('https://free-spotify-using-mern.vercel.app/login', newUser);
    //handle jwt token
    if(response.data.token) {
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/home');
    } else {
      alert(response.data.message);
      navigate('/login');
    }
  }


  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handlelogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password"value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Login</button>
        Don't have an account? <Link className='linkfor' to = '/register'>Sign Up</Link>
      </form>
    </div>
  )
}

export default Login
