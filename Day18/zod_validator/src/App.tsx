// frontend/src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/register', formData);
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response.data?.errors?.[0]?.message || 'Validation failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
