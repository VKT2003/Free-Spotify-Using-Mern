import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Joke from './components/Joke';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <div id="root">
      <Router>
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/joke' element={<Joke />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App