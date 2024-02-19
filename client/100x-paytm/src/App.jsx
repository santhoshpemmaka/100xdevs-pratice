import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login'
function App() {
    return (
        <div className=''>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route  path="/signin" element={<Login/> }/>
            </Routes>
        </div>
    )
}

export default App;
