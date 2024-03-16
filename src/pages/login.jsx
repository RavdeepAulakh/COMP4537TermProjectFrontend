import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://comp-4537-term-project-backend.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include' // Include cookies in the request
      });
      const data = await response.json();
      console.log('Login response:', data);
      
      // Store userId and role in sessionStorage
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('role', data.role);
      sessionStorage.setItem('token', data.token);

      // Redirect to user page if the role is USER
      if (data.role === 'USER') {
        navigate('/UserPage'); 
      }

    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}

export default Login;
