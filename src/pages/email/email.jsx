import React, { useState } from 'react';
import { usePasswordRecovery } from '../../auth/PasswordRecoveryContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function Email() {
    const [email, setEmail] = useState('');
    const { setHasInitiatedRecovery } = usePasswordRecovery();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const sendEmail = async () => {
        try {
            const response = await fetch('/password-recovery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setHasInitiatedRecovery(true);
                // Redirect to the Code component using navigate
                navigate('/recover-password/code', { state: { email } });
            } else {
                // Handle error
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div>
            <h1>Enter a valid email to reset your password</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendEmail}>Send</button>
        </div>
    );
}

export default Email;
