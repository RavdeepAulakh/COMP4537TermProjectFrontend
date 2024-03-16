import React, { useEffect, useState } from 'react';

function UserPage() {
  const [apiCallsLeft, setApiCallsLeft] = useState(null);

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
      .catch(error => console.error('Error fetching API calls:', error.message));
    }
  }, []);

  return (
    <div className="container">
      <h2>User Page</h2>
      {apiCallsLeft !== null ? (
        <p>API Calls Left: {apiCallsLeft}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserPage;
