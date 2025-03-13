import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveJob,
  applyJob,
  fetchSavedJobs,
  fetchAppliedJobs,
} from "../redux/slice/jobActionSlice";
import { toast } from "react-toastify";

const JobAction = ({ jobId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { savedJobs, appliedJobs } = useSelector((state) => state.jobActions);

  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    dispatch(fetchSavedJobs());
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  useEffect(() => {
    if (!savedJobs || !appliedJobs) return;

    const savedJob = savedJobs.find((job) => job?.job?._id === jobId);
    setIsSaved(savedJob ? savedJob.saved : false);

    const appliedJob = appliedJobs.find((job) => job?.job?._id === jobId);
    setIsApplied(appliedJob ? appliedJob.applied : false);
  }, [savedJobs, appliedJobs, jobId]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      await dispatch(saveJob(jobId)).unwrap();
      dispatch(fetchSavedJobs());
      toast.success(isSaved ? "Job Unsaved" : "Job Saved");
    } catch (error) {
      toast.error("Failed to update job status");
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (isApplied) {
      toast.info("You have already applied for this job");
      return;
    }
    try {
      await dispatch(applyJob(jobId)).unwrap();
      dispatch(fetchAppliedJobs());
      toast.success("Successfully applied for job!");
    } catch (error) {
      toast.error("Failed to apply for job");
    }
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={handleSave}
        className={`${
          isSaved ? "bg-green-600" : "bg-blue-600"
        } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer`}
      >
        {isSaved ? "Unsave" : "Save"}
      </button>
      <button
        onClick={handleApply}
        disabled={isApplied}
        className={`${
          isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
        } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer`}
      >
        {isApplied ? "Applied" : "Apply Now"}
      </button>
    </div>
  );
};

export default JobAction;
