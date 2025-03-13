import User from '../models/usermodel.js';
import Job from '../models/jobmodel.js';
import Application from '../models/jobApplicationModel.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments({ applied: true });
    const totalSavedJobs = await Application.countDocuments({ saved: true });
    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(4);

    res.status(200).json({
      totalUsers,
      totalJobs,
      totalApplications,
      totalSavedJobs,
      recentJobs,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
