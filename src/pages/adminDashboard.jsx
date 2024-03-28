import React, { useEffect, useState } from 'react';
import '../styles/adminDashboard.css';

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    apiCallsData: [],
    totalCallsData: [],
    methodCallsData: []
  });

  useEffect(() => {
    // Fetch all dashboard data in a single call
    fetch('https://comp-4537-term-project-backend.vercel.app/admin', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
        .then(response => response.json())
        .then(data => {
          console.log('All API Calls:', data.apiCalls);
          setDashboardData({
            apiCallsData: data.apiCalls,
            totalCallsData: data.totalCalls,
            methodCallsData: data.methodCalls
          });
        })
        .catch(error => console.error('Error fetching dashboard data:', error.message));
  }, []);

  return (
      <div className="admin-dashboard-container">
        <h2 className="admin-dashboard-title">Admin Dashboard</h2>
        <div className="admin-dashboard-section">
          <h3 className="admin-dashboard-subtitle">API Calls</h3>
          <table className="admin-dashboard-api-calls-table">
            <thead>
            <tr>
              <th>User Name</th>
              <th>API Calls</th>
            </tr>
            </thead>
            <tbody>
            {dashboardData.apiCallsData.map((apiCall, index) => (
                <tr key={index}>
                  <td>{apiCall.username}</td>
                  <td>{apiCall.calls}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="admin-dashboard-section">
          <h3 className="admin-dashboard-subtitle">Total Calls</h3>
          <table className="admin-dashboard-total-calls-table">
            <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Total Calls</th>
            </tr>
            </thead>
            <tbody>
            {dashboardData.totalCallsData.map((totalCall, index) => (
                <tr key={index}>
                  <td>{totalCall.id}</td>
                  <td>{totalCall.email}</td>
                  <td>{totalCall.total_request}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="admin-dashboard-section">
          <h3 className="admin-dashboard-subtitle">Method Calls</h3>
          <table className="admin-dashboard-method-calls-table">
            <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Requests</th>
            </tr>
            </thead>
            <tbody>
            {dashboardData.methodCallsData.map((methodCall, index) => (
                <tr key={index}>
                  <td>{methodCall.method}</td>
                  <td>{methodCall.endpoint}</td>
                  <td>{methodCall.request}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default AdminDashboard;
