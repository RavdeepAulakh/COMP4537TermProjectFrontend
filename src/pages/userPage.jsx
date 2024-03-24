import React, { useEffect, useState } from 'react';
import '../styles/userPage.css'; // Import the CSS file

function UserPage() {
    const [apiCallsLeft, setApiCallsLeft] = useState(null);
    const [inputValue, setInputValue] = useState(''); // State for input value
    const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading for POST request
    const [summary, setSummary] = useState(null); // State for summary text
    const [warningMessage, setWarningMessage] = useState(''); // State for warning message

    useEffect(() => {
        // Check if the user is logged in as a user
        const role = sessionStorage.getItem('role');
        if (role !== 'USER') {
            // Redirect to login page or another appropriate page
            window.location.href = '/login';
        } else {
            // Fetch user's API calls left
            fetch('https://comp-4537-term-project-backend.vercel.app/api-calls', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Retrieve token from cookie
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('API Calls Left:', data.calls);
                    setApiCallsLeft(data.calls);
                })
                .catch(error => {
                    console.error('Error fetching API calls:', error.message);
                });
        }
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting to true while waiting for the response
        try {
            // Fetch the current API calls count
            const apiCallsLeftResponse = await fetch('https://comp-4537-term-project-backend.vercel.app/api-calls', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Retrieve token from cookie
                }
            });
            const apiCallsLeftData = await apiCallsLeftResponse.json();
            console.log('Current API Calls Left:', apiCallsLeftData.calls);

            // Check if the user has any API calls left
            if (apiCallsLeftData.calls === 0) {
                setWarningMessage('Warning: You have no API calls remaining.');
            }

            console.log("Making post to LLM")
            // Call the hosted LLM
            const llmResponse = await fetch('https://d155-24-84-205-84.ngrok-free.app/v1/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputValue }), // Send the text input as JSON
            });
            const llmData = await llmResponse.json();
            console.log('Response from LLM:', llmData);
            setSummary(llmData[0].summary_text); // Set the summary in state

            console.log("Making request to server")
            // Decrement the API calls count
            const apiCallsDownResponse = await fetch('http://localhost:8000/v1/api-calls-down', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const apiCallsDownData = await apiCallsDownResponse.json();
            console.log('Response from API Calls Down:', apiCallsDownData);

            // Fetch the updated API calls count
            const updatedApiCallsLeftResponse = await fetch('https://comp-4537-term-project-backend.vercel.app/api-calls', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Retrieve token from cookie
                }
            });
            const updatedApiCallsLeftData = await updatedApiCallsLeftResponse.json();
            console.log('Updated API Calls Left:', updatedApiCallsLeftData.calls);
            setApiCallsLeft(updatedApiCallsLeftData.calls); // Update the API calls left in state
        } catch (error) {
            console.error('Error sending data:', error.message);
        } finally {
            setIsSubmitting(false); // Set submitting to false after handling the response
        }
    };

    return (
        <div className="user-page-container">
            {warningMessage && (
                <div className="warning-banner" color='red'>{warningMessage}</div>
            )}
            <h2 className="user-page-title">User Page</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="user-page-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter something..."
                />
                <button className="user-page-submit" type="submit">Submit</button>
            </form>
            {isSubmitting ? (
                <div className="loading-spinner"></div>
            ) : (
                <p className="user-page-content">API Calls Left: {apiCallsLeft}</p>
            )}
            {summary && (
                <div className="summary-container">
                    <h3>Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}

export default UserPage;
