import express from 'express';
import cors from 'cors';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json());

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }
  };
};

app.post('/register', validate(registerSchema), (req, res) => {
  res.status(200).json({ message: 'Registration successful' });
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
