import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PasswordRecoveryProvider } from './PasswordRecoveryContext';
import Signup from './pages/signup';
import Login from './pages/login';
import UserPage from './pages/userPage';
import Index from './pages/index';
import Navbar from './components/navbar';
import Email from './pages/email/email';
import Code from './pages/email/code';

function App() {
    return (
        <PasswordRecoveryProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/userPage" element={<UserPage />} />
                    <Route path="/recover-password" element={<Email />} />
                    <Route path="/recover-password/code" element={<Code />} />
                </Routes>
            </Router>
        </PasswordRecoveryProvider>
    );
}

export default App;
