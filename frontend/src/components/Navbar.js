import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSpotify } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import './App.css';

const Navbar = () => {
  const [userData, setUserData] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch user data from local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token
      const data = jwtDecode(token);
      setUserData(data.user.name);
    } else {
      console.log('User not logged in');
    }
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <FaSpotify size={45} color="white" />
      <div className='split'>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="home">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="joke">Joke</Link></li>
      </ul>
      {userData ? (
        <div className="userInfo">
          <div className="profile">{userData.charAt(0)}</div>
          <button className="logoutbutton" onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}>Logout</button>
        </div>
      ) : (
       <Link style={{textDecoration:'none',color:'white',fontSize:'20px',marginRight:'10px',marginTop:'4px',marginLeft:'10px'
       }} to="login">Sign In</Link>
      )}
      </div>

      <div
        className={`hamburgerMenu ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
