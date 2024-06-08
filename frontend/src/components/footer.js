// src/Footer.js
import React from 'react';
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';
import './App.css';

const Footer = () => {
  return (
    <footer className="footer ">
      <div className="footer-container">
        <div className="social-icons">
          <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter />
          </a>
        </div>
        <p className="footer-text">© 2024 Vikas Tech Music. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
