import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div style={{ border: '2px solid black', padding: '1rem' }}>
      <nav style={{ marginBottom: '1rem', backgroundColor: '#f0f0f0', padding: '1rem' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>🏠 Home</Link>
        <Link to="/about" style={{ margin: '0 1rem' }}>ℹ️ About</Link>
        <Link to="/contact" style={{ margin: '0 1rem' }}>📞 Contact</Link>
      </nav>

      <div style={{ backgroundColor: '#dff0d8', padding: '2rem', minHeight: '200px' }}>
        <h3>🔽 Below is the Outlet area</h3>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
