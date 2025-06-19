import React from 'react';

const Dashboard = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Welcome to Dashboard (Private)</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
