import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/slice/jobSlice";
import JobSearch from "./JobSearch";
import Pagination from "./Pagination";
import JobAction from "../JobAction/JobAction";
import Loading from "./Loading";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const sortedJobs = [...jobs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredJobs(sortedJobs);
  }, [jobs]);

  const handleSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredJobs(filtered);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-6 flex justify-center text-blue-700 font-bold">
          Available Jobs
        </h2>

        <JobSearch onSearch={handleSearch} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 mt-2"
            >
              <h3 className="text-xl font-semibold text-blue-900 flex justify-center">
                {job.title}
              </h3>
              <p className="text-sm md:text-lg flex justify-center mt-2 font-medium text-gray-800">
                Company:<span className="font-normal text-red-600 ml-1">{job.company}</span>
              </p>
              <p className="text-sm text-black flex justify-center mt-4 leading-relaxed h-14 overflow-y-auto">
                {job.description}
              </p>
              <p className=" text-gray-600 mt-2 flex justify-center items-center space-x-2">
                <span className="font-semibold text-gray-800">Location:</span>
                <span className="text-red-600">{job.location}</span>
              </p>
              <p className="text-black mt-2 flex justify-center items-center space-x-2">
                <span className="font-semibold text-gray-800">Contract:</span>
                <span className="text-red-600">{job.contractType}</span>
              </p>
              <div className="items-center mt-3 flex justify-center">
                Salary:{" "}
                <span className="text-md font-medium text-blue-600">
                  NRs {job.salary}
                </span>
              </div>
              <div className="flex justify-center">
                {" "}
                <JobAction
                  jobId={job._id}
                  initialSaved={job.isSaved}
                  initialApplied={job.isApplied} 
                />
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Jobs;
