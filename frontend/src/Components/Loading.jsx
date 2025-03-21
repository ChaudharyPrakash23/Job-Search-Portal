import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-transparent border-blue-600" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
