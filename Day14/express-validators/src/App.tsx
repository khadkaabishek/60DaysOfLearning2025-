import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5001/api/register', formData);
      setSuccess(res.data.message);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors.map((e: any) => e.msg));
      } else {
        setErrors(['Something went wrong!']);
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        /><br /><br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br /><br />
        <button type="submit">Register</button>
      </form>

      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default App;
