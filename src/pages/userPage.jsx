import React, { useEffect, useState } from 'react';
import '../styles/userPage.css'; // Import the CSS file

function UserPage() {
    const [apiCallsLeft, setApiCallsLeft] = useState(null);
    const [inputValue, setInputValue] = useState(''); // State for input value
    const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading for POST request
    const [summary, setSummary] = useState(null); // State for summary text

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
            const response = await fetch('https://6955-24-84-205-84.ngrok-free.app/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputValue }), // Send the text input as JSON
            });
            const data = await response.json();
            console.log('Response from LLM:', data);
            setSummary(data[0].summary_text); // Set the summary in state
            setIsSubmitting(false); // Set submitting to false after receiving the response
        } catch (error) {
            console.error('Error sending data:', error.message);
            setIsSubmitting(false); // Set submitting to false even if there is an error
        }
    };    

    return (
        <div className="user-page-container">
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
