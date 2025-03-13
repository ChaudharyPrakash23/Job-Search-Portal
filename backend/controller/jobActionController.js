import JobApplication from '../models/jobApplicationModel.js';
import Job from '../models/jobmodel.js';
import User from '../models/usermodel.js';

// Toggle save/unsave a job
export const toggleSaveJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user._id;

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Find the existing job application for this user and job
    const existingJob = await JobApplication.findOne({
      user: userId,
      job: jobId,
    });

    if (existingJob) {
      // If the job is already saved, toggle it to unsaved
      if (existingJob.saved) {
        existingJob.saved = false;
      } else {
        existingJob.saved = true; // If it's not saved, save it
      }
      
      await existingJob.save();
      return res.status(200).json({ message: `Job ${existingJob.saved ? 'saved' : 'unsaved'} successfully` });
    } else {
      // If no job application found for this user and job, create a new one and save the job
      const newJob = new JobApplication({
        user: userId,
        job: jobId,
        saved: true,  // Initially save the job
        applied: false,  // Mark as not applied
      });

      await newJob.save();
      return res.status(200).json({ message: 'Job saved successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply for a job
export const applyJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user._id;

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user has already applied for this job
    const existingApplication = await JobApplication.findOne({
      user: userId,
      job: jobId,
      applied: true,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Apply for the job
    const application = new JobApplication({
      user: userId,
      job: jobId,
      saved: false,  // Mark as not saved
      applied: true,  // Mark as applied
    });

    await application.save();
    res.status(200).json({ message: 'Applied for the job successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all saved jobs for a user
export const getSavedJobs = async (req, res) => {
  const userId = req.user._id;

  try {
    const savedJobs = await JobApplication.find({ user: userId, saved: true })
      .populate('job', 'title company location salary description jobType')
      .exec();

    if (!savedJobs.length) {
      return res.status(404).json({ message: 'No saved jobs found' });
    }

    res.status(200).json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applied jobs for a user
export const getAppliedJobs = async (req, res) => {
  const userId = req.user._id;

  try {
    const appliedJobs = await JobApplication.find({ user: userId, applied: true })
      .populate('job', 'title company location salary description jobType')
      .exec();

    if (!appliedJobs.length) {
      return res.status(404).json({ message: 'No applied jobs found' });
    }

    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

