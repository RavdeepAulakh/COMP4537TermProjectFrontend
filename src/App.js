import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import UserPage from './pages/userPage'
import Index from './pages/index'
import Navbar from "./components/navbar";
import AdminDashboard from './pages/adminDashboard';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/userPage" element={<UserPage/>}/>
                <Route path='/adminDashboard' element={<AdminDashboard/>}/>
            </Routes>
        </Router>
    );
}

export default App;
