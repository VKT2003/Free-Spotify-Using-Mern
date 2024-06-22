import React from 'react';
import './FormStyles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    const newUser = { email, password };
    try {
      const response = await axios.post('https://free-spotify-using-mern.vercel.app/login', newUser);
      // Handle JWT token
      if (response.data.token) {
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/home');
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handlelogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Login</button>
        Don't have an account? <Link className='linkfor' to='/register'>Sign Up</Link>
      </form>
    </div>
  )
}

export default Login;
    
