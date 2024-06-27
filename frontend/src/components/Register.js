import React from 'react'
import './FormStyles.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
 
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password };
      const response = await axios.post('https://free-spotify-using-mern.vercel.app/register', newUser);
      console.log(response.data); // Check the response data here
      //check if user already exists
      if (response.data.message === 'User created') {
        toast.success('Registration successful');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message);
        setTimeout(() => {
          navigate('/register');
        }, 2000);
        
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
    }
  }
      
  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Register</button>
        Already have an account? <Link className='linkfor' to='/login'>Sign In</Link>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register;
