import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [apiCallsData, setApiCallsData] = useState([]);

  useEffect(() => {
    // Fetch all users' API calls data
    fetch('https://comp-4537-term-project-backend.vercel.app/admin', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log('All API Calls:', data.apiCalls);
      setApiCallsData(data.apiCalls);
    })
    .catch(error => console.error('Error fetching API calls:', error.message));
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>API Calls</th>
          </tr>
        </thead>
        <tbody>
          {apiCallsData.map(apiCall => (
            <tr key={apiCall.username}>
              <td>{apiCall.username}</td>
              <td>{apiCall.calls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
