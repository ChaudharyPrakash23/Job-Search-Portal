import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [contractType, setContractType] = useState('Full-time');
  const [errorMessage, setErrorMessage] = useState('');
  const [salaryError, setSalaryError] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !company || !location || !description || !salary) {
      setErrorMessage('All fields are required.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('You are not authenticated.');
      toast.error('You are not authenticated.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          title,
          company,
          location,
          salary,
          contractType,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Job created successfully!');
        navigate('/jobs');
      } else {
        setErrorMessage(data.message || 'Failed to create job.');
        toast.error(data.message || 'Failed to create job.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value;
    if (/^\d*(\.\d{0,2})?$/.test(value)) {
      setSalary(value);
      setSalaryError(''); 
    } else {
      setSalaryError('Salary must be a valid number.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">Create Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter job title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter company name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter job location"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter job description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={salary}
              onChange={handleSalaryChange} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter salary"
            />
            {salaryError && (
              <div className="text-red-600 text-sm mt-2">
                {salaryError}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              id="contractType"
              name="contractType"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none transition duration-300 cursor-pointer`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Job'}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 text-center text-red-600">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
