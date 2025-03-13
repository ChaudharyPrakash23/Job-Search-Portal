import express from 'express';
import cors from 'cors';
import connectDB from './connectdb/connection.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authroutes.js';
import jobRoutes from './routes/jobRoutes.js';
import jobActionRoutes from "./routes/jobActionRoutes.js"
import dashboardRoutes from './routes/dashboardroutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// db connection
connectDB()
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/job-actions', jobActionRoutes);
app.use('/api/admin', dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
