import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email, code } = location.state;

    const handleSetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        } else {
            setErrorMessage(''); // Clear any previous error message
        }

        try {
            const response = await fetch('/set-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                navigate('/login'); // Redirect to login page after successful password reset
            } else {
                console.error(data.message);
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error setting new password:', error);
            setErrorMessage('Error setting new password');
        }
    };

    return (
        <div>
            <h1>Set New Password</h1>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button onClick={handleSetPassword}>Set Password</button>
        </div>
    );
}

export default SetPassword;
