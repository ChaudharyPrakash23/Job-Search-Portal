import React, { useEffect } from "react";
import { Edit, Trash2 } from "react-feather";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, deleteJob } from "../redux/slice/jobSlice"; 
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const Managejob = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = async (jobId) => {
    try {
      await dispatch(deleteJob(jobId));
      toast.success("Job deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete job.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold mb-4 flex justify-center text-red-600">Manage Jobs</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Job Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Location</th>
              <th className="p-3">Posted Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-3">No jobs found</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="border-b">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.company}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">{formatDate(job.createdAt)}</td>
                  <td className="p-3">
                    <div className="flex space-x-3 items-center justify-start">
                      <Link
                        to={`/edit-job/${job._id}`} 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managejob;
