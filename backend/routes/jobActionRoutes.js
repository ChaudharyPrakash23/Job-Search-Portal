import express from "express";
import {  
  applyJob, 
  getSavedJobs, 
  getAppliedJobs, 
  toggleSaveJob  // updated from 'removeSavedJob' to 'toggleSaveJob'
} from "../controller/jobActionController.js"; 
import { authMiddleware } from "../middleware/authmiddleware.js";  

const router = express.Router();

// Toggle save/unsave functionality (same endpoint for save/unsave)
router.post("/save/:jobId", authMiddleware, toggleSaveJob);  // 'saveJob' will now handle both save and unsave
router.post("/apply/:jobId", authMiddleware, applyJob);  
router.get("/saved", authMiddleware, getSavedJobs);  
router.get("/applied", authMiddleware, getAppliedJobs); 

export default router;
