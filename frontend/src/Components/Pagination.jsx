import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-300 cursor-pointer"
      >
        Prev
      </button>
      <span className="text-lg font-semibold text-gray-800">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-300 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
