import React from 'react'
import './FormStyles.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
 
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password };
      const response = await axios.post('http://localhost:4000/register', newUser);
      console.log(response);
      //check if user already exists
      if(response.data.message === 'User created') {
        alert('User created');
        navigate('/login');
      }
      else {
        alert(response.data.message);
        navigate('/register');
      }
    }
    catch (error) {
      console.error(error);
    }
  }
      

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Register</button>
        Already have an account? <Link className = 'linkfor' to = '/login'>Sign In</Link>
      </form>
    </div>
  )
}

export default Register