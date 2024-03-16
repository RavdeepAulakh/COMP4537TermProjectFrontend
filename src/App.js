import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import UserPage from './pages/userPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
