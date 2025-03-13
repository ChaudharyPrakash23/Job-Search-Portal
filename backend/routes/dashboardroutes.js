import express from 'express';
import { getAdminDashboard } from '../controller/dashboardController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, getAdminDashboard);

export default router;
