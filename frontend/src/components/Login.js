import React from 'react'
import './FormStyles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
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
      const response = await axios.post('https://free-spotify-using-mern-rmmoipy8v-vkt2003s-projects.vercel.app/login', newUser);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        toast.error(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Login failed');
      console.error('Login error:', error);
    }
  }

  const googlLogin = async (credentialResponse) => {
    try {
      const response = jwtDecode(credentialResponse.credential);
      const newUser = { email: response.email, name: response.name, password: response.sub };
      const loginResponse = await axios.post('http://localhost:4000/api/google', newUser);
      if (loginResponse.data.token) {
        localStorage.setItem('token', loginResponse.data.token);
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        toast.error(loginResponse.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Login failed');
      console.error('Login error:', error);
      navigate('/login');
    }
  };

  return (
    <div className="form-container">
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
        <GoogleOAuthProvider clientId="471238106398-q9bm3uh902sm01l62oo7kbjj2359a3al.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={googlLogin}
            onError={() => {
              toast.error('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login;
