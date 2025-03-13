import Job from '../models/jobmodel.js';
import Application from '../models/jobApplicationModel.js';

// Fetch all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from the database
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//get job by id
 export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createJob = async (req, res) => {
  const { title, company, location, salary, contractType,description } = req.body;

  try {
    const newJob = new Job({ title, company, location, salary, contractType,description});
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const manageJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (req.method === 'DELETE') {
      await Job.findByIdAndDelete(jobId);
      return res.status(200).json({ message: 'Job deleted successfully' });
    }

    if (req.method === 'PUT') {
      const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true, runValidators: true });
      return res.status(200).json({ message: 'Job updated successfully',
        job: updatedJob});
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getJobApplications = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.find({ job: jobId }).populate('user');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
