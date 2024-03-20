import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Import the CSS file

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState(false); // Add this line

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError(false); // Reset the error state when the user starts typing
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

      if (data.error) {
        setLoginError(true); // Set the error state if there's an error in the response
        return; // Don't proceed further if there's an error
      }

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
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input className={`login-input ${loginError ? 'error' : ''}`} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className={`login-input ${loginError ? 'error' : ''}`} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          {loginError && <div className="login-error">Invalid email or password</div>}
          <button className="login-button" type="submit">Login</button>
        </form>
        <p className="login-signup-link">Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
  );
}

export default Login;