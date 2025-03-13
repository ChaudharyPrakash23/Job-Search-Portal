import express from 'express';
import { getAllJobs,createJob, manageJob, getJobApplications,getJobById} from '../controller/jobController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getAllJobs);

router.post('/', authMiddleware, createJob);
router.route('/:jobId')
  .get(getJobById)
  .put(authMiddleware, manageJob)
  .delete(authMiddleware, manageJob);
router.get('/:jobId/applications', authMiddleware, getJobApplications);

export default router;
