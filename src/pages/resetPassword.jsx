import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/resetPassword.css'; // Import the CSS file

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://comp-4537-term-project-backend.vercel.app/password-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setCodeSent(true);
      } else {
        setResetError(true);
      }
    } catch (error) {
      console.error('Error sending code:', error.message);
      setResetError(true);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {
      const response = await fetch('https://comp-4537-term-project-backend.vercel.app/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        handleResetPassword(e);
        setResetSuccess(true);
      } else {
        setResetError(true);
      }
    } catch (error) {
      console.error('Error verifying code:', error.message);
      setResetError(true);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://comp-4537-term-project-backend.vercel.app/reset-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code, newPassword })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        handleDeleteRow(e);
        setResetSuccess(true);
      } else {
        setResetError(true);
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
      setResetError(true);
    }
  };

  const handleDeleteRow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://comp-4537-term-project-backend.vercel.app/delete-row', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log('Row deleted successfully');
      } else {
        console.log('Failed to delete row');
      }
    } catch (error) {
      console.error('Error deleting row:', error.message);
    }
  }

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>
      {!codeSent ? (
        <form className="reset-password-form" onSubmit={handleSendCode}>
          <input
            className="reset-password-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
          <button className="reset-password-button" type="submit">
            Send Verification Code
          </button>
          {resetError && (
            <div className="reset-error-message">
              Failed to send verification code. Please try again.
            </div>
          )}
        </form>
      ) : (
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <input
            className="reset-password-input"
            type="text"
            name="code"
            placeholder="Enter verification code"
            value={code}
            onChange={handleCodeChange}
            required
          />
          <input
            className="reset-password-input"
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <button className="reset-password-button" type="submit">
            Verify Code & Reset Password
          </button>
          {resetError && (
            <div className="reset-error-message">
              Failed to reset password. Please try again.
            </div>
          )}
        </form>
      )}
      {resetSuccess && (
        <div className="reset-success-message">
          Password has been reset successfully.
        </div>
      )}
      <p className="reset-login-link">
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
