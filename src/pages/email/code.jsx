import React, { useState, useEffect } from 'react';
import { usePasswordRecovery } from '../../auth/PasswordRecoveryContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

function Code() {
    const [code, setCode] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const location = useLocation(); // Use useLocation to access the state
    const email = location.state?.email || 'your email';
    const { hasInitiatedRecovery } = usePasswordRecovery();

    useEffect(() => {
        if (!hasInitiatedRecovery) {
            navigate('/recover-password'); // Use navigate for redirection
        }
    }, [hasInitiatedRecovery, navigate]);

    const verifyCode = async () => {
        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                navigate('/recover-password/setPassword', { state: { code } }); // Use navigate for redirection
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error verifying code:', error);
        }
    };

    return (
        <div>
            <h1>Enter the code sent to {email}</h1>
            <input
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={verifyCode}>Verify</button>
        </div>
    );
}

export default Code;
