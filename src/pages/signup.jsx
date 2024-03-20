import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../styles/signup.css'; // Import the CSS file

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://comp-4537-term-project-backend.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include' // Include cookies in the request
      });
      const data = await response.json();
      console.log('Signup response:', data);

      navigate('/Login')

    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
      <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input className="signup-input" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input className="signup-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className="signup-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button className="signup-button" type="submit">Signup</button>
        </form>
        <p className="signup-login-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
  );
}

export default Signup;
