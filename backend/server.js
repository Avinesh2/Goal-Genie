import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import goalRoutes from './server/routes/goalRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connect
connectDB();

// Routes
app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
