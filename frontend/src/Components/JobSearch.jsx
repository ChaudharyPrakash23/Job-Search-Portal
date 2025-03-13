import React, { useState } from 'react';

const JobSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearchSubmit} className="flex items-center bg-white border border-gray-300 p-3 rounded-4xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out max-w-xl mx-auto">
        <input
          type="text"
          className="p-3 w-full rounded-4xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          placeholder="Search jobs by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="ml-3 bg-blue-600 text-white px-4 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default JobSearch;
